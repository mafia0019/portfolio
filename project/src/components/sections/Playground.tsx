import React, { useState, useEffect } from 'react';
import { Bug, Code, CheckCircle, XCircle, RefreshCw, Eye } from 'lucide-react';
import { CodeSnippet, codeSnippets } from '../../data/codeSnippets';

// Function to get 3 random snippets
const getRandomSnippets = (): CodeSnippet[] => {
  // Create a copy of the array to avoid mutating the original
  const shuffled = [...codeSnippets].sort(() => Math.random() - 0.5);
  
  // Add timestamp to force new snippets on each page load
  const timestamp = new Date().getTime();
  sessionStorage.setItem('lastShuffleTime', timestamp.toString());
  
  return shuffled.slice(0, 3);
};

const Playground: React.FC = () => {
  const [gameSnippets, setGameSnippets] = useState<CodeSnippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet | null>(null);
  const [userSolution, setUserSolution] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  // Initialize game state on mount and handle refresh
  useEffect(() => {
    const initializeGame = () => {
      const newSnippets = getRandomSnippets();
      setGameSnippets(newSnippets);
      setCurrentSnippet(newSnippets[0]);
      setLevel(1);
      setScore(0);
      setGameOver(false);
      setShowHint(false);
      setShowSolution(false);
      setFeedback(null);
      setSolutionRevealed(false);
    };

    // Force re-initialization on page load
    initializeGame();

    // Add event listener for page visibility changes
    document.addEventListener('visibilitychange', initializeGame);

    return () => {
      document.removeEventListener('visibilitychange', initializeGame);
    };
  }, []);

  useEffect(() => {
    if (gameSnippets.length > 0) {
      if (level <= 3) {
        setCurrentSnippet(gameSnippets[level - 1]);
        setUserSolution('');
        setShowHint(false);
        setShowSolution(false);
        setFeedback(null);
        setSolutionRevealed(false);
      } else {
        setGameOver(true);
      }
    }
  }, [level, gameSnippets]);

  const normalizeCode = (code: string) => {
    return code
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*=\s*/g, '=')
      .replace(/\s*\+\s*/g, '+')
      .replace(/\s*-\s*/g, '-')
      .replace(/\s*\*\s*/g, '*')
      .replace(/\s*\/\s*/g, '/')
      .replace(/\s*\(\s*/g, '(')
      .replace(/\s*\)\s*/g, ')')
      .replace(/\s*\[\s*/g, '[')
      .replace(/\s*\]\s*/g, ']')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*\.\s*/g, '.')
      .replace(/\s*>\s*/g, '>')
      .replace(/\s*<\s*/g, '<')
      .replace(/\s*!\s*/g, '!')
      .replace(/\s*&\s*/g, '&')
      .replace(/\s*\|\s*/g, '|')
      .replace(/\s*\?\s*/g, '?')
      .replace(/\s*:\s*/g, ':')
      .replace(/^\s*[\r\n]/gm, '');
  };

  const handleSubmit = () => {
    if (!currentSnippet) return;

    const normalizedUserSolution = normalizeCode(userSolution);
    const normalizedCorrectSolution = normalizeCode(currentSnippet.fixedCode);
    
    const isCorrect = normalizedUserSolution === normalizedCorrectSolution;
    
    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: solutionRevealed 
          ? 'Correct! But no points since you used the solution. Try the next level! 🎯'
          : 'Great job! Bug fixed correctly! 🎉'
      });
      
      setTimeout(() => {
        if (!solutionRevealed) {
          const newScore = score + (currentSnippet.difficulty === 'easy' ? 10 : 
                                  currentSnippet.difficulty === 'medium' ? 20 : 30);
          setScore(newScore);
        }
        setLevel(prev => prev + 1);
      }, 1500);
    } else {
      setFeedback({
        type: 'error',
        message: 'Not quite right. Try again! 💪'
      });
    }
  };

  const handleShowSolution = () => {
    setShowConfirmDialog(true);
  };

  const confirmShowSolution = () => {
    if (currentSnippet) {
      setUserSolution(currentSnippet.fixedCode);
      setShowSolution(true);
      setSolutionRevealed(true);
      setShowConfirmDialog(false);
      setFeedback({
        type: 'error',
        message: 'Solution revealed. You won\'t get points for this level, but try to understand why this fixes the bug! 💡'
      });
    }
  };

  const resetGame = () => {
    const newSnippets = getRandomSnippets();
    setGameSnippets(newSnippets);
    setCurrentSnippet(newSnippets[0]);
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setShowHint(false);
    setShowSolution(false);
    setFeedback(null);
    setSolutionRevealed(false);
  };

  if (gameOver) {
    return (
      <section id="playground" className="py-20 bg-gray-900 dark:bg-gray-800 text-white transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Bug Hunt Complete! 🎉</h2>
            <p className="text-xl mb-6">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors interactive mx-auto"
            >
              <RefreshCw size={20} />
              Play Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="playground" className="py-20 bg-gray-900 dark:bg-gray-800 text-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        {gameOver ? (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Bug Hunt Complete! 🎉</h2>
            <p className="text-xl mb-6">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors interactive mx-auto"
            >
              <RefreshCw size={20} />
              Play Again
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Bug Hunt</h2>
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="text-lg">
                  Level: <span className="font-bold">{level}/3</span>
                </div>
                <div className="text-lg">
                  Score: <span className="font-bold">{score}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md transition-colors interactive"
                  >
                    <Bug size={18} />
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  <button
                    onClick={handleShowSolution}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors interactive"
                  >
                    <Eye size={18} />
                    Show Solution
                  </button>
                </div>
              </div>

              {currentSnippet && (
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Code size={20} />
                      <span className="font-mono">{currentSnippet.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm px-2 py-1 rounded bg-gray-700">
                        {currentSnippet.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded p-4 mb-4 code-container">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {currentSnippet.code.split('\n').map((line, index) => (
                        <div key={index} className="code-line">
                          {line || '\u00A0'}
                        </div>
                      ))}
                    </pre>
                  </div>

                  {showHint && (
                    <div className="bg-yellow-900/30 rounded p-4 mb-4">
                      <p className="text-yellow-400">
                        <strong>Hint:</strong> {currentSnippet.bug}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <textarea
                      value={userSolution}
                      onChange={(e) => setUserSolution(e.target.value)}
                      className="w-full h-48 bg-gray-900 text-white font-mono p-4 rounded resize-none code-container"
                      placeholder="Write your fixed code here..."
                    />
                  </div>

                  {feedback && (
                    <div className={`mb-4 p-4 rounded ${
                      feedback.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                    }`}>
                      <p className="flex items-center gap-2">
                        {feedback.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        {feedback.message}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md transition-colors interactive"
                    >
                      <CheckCircle size={20} />
                      Submit Fix
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-4">Show Solution?</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to see the solution? This will help you learn, but you won't get points for this level.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmShowSolution}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
              >
                Show Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Playground;