import React, { useEffect } from 'react';
import { CursorProvider } from './contexts/CursorContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Playground from './components/sections/Playground';
import Contact from './components/sections/Contact';
import { useHoverEffect } from './hooks/useHoverEffect';
import { useCursor } from './contexts/CursorContext';
import IdeaGenerator from './components/sections/IdeaGenerator';

const AppContent: React.FC = () => {
  const { cursorType } = useCursor();
  
  useHoverEffect('a, button, .interactive, input, textarea');
  
  useEffect(() => {
    document.title = 'Abhinav Kumar | Portfolio';
    document.body.classList.add('custom-cursor');
    
    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, []);
  
  return (
    <div className="app overflow-hidden">
      <Cursor cursorType={cursorType} />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Playground />
        <IdeaGenerator />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <AppContent />
      </CursorProvider>
    </ThemeProvider>
  );
}

export default App;