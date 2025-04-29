import React, { useEffect, useState } from 'react';

interface TypingTitleProps {
  titles: string[];
}

const TypingTitle: React.FC<TypingTitleProps> = ({ titles }) => {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentText = '';
    let currentCharIndex = 0;
    const targetText = titles[currentIndex];

    const typeText = () => {
      if (currentCharIndex < targetText.length) {
        currentText += targetText[currentCharIndex];
        setDisplayedTitle(currentText);
        currentCharIndex++;
        timeout = setTimeout(typeText, 100);
      } else {
        timeout = setTimeout(() => {
          deleteText();
        }, 2000);
      }
    };

    const deleteText = () => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setDisplayedTitle(currentText);
        timeout = setTimeout(deleteText, 50);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }
    };

    typeText();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [currentIndex, titles]);

  return (
    <h2 className="typing-title text-2xl md:text-3xl text-blue-400 font-medium mb-6">
      {displayedTitle}
      <span className="typing-cursor">|</span>
    </h2>
  );
};

export default TypingTitle; 