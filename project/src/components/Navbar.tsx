import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleDownloadResume = () => {
    try {
      // Use the correct path from the public folder
      const resumeUrl = '/Abhinav_s_resume.pdf';
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Abhinav_Kumar_Resume.pdf';
      link.target = '_blank'; // Open in new tab if download fails
      link.rel = 'noopener noreferrer';
      
      // Add error handling
      link.onerror = () => {
        console.error('Failed to download resume');
        // Fallback to opening in new tab
        window.open(resumeUrl, '_blank');
      };
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback to opening in new tab
      window.open('/Abhinav_s_resume.pdf', '_blank');
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [isOpen]);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 dark:bg-gray-900 bg-opacity-90 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="text-white text-2xl font-bold interactive">AK</a>
        
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-white hover:text-blue-400 transition-colors duration-300 interactive"
            >
              {item}
            </a>
          ))}
          
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors interactive"
          >
            <Download size={16} />
            <span>Resume</span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 text-white hover:text-blue-400 transition-colors interactive"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-white hover:text-blue-400 transition-colors interactive"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="text-white focus:outline-none interactive"
            onClick={toggleNav}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      <div className="mobile-menu fixed top-0 right-0 h-full w-64 bg-gray-900 bg-opacity-95 transform translate-x-full z-50 md:hidden">
        <div className="p-6">
          <button 
            className="text-white mb-8 focus:outline-none interactive"
            onClick={toggleNav}
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col space-y-6">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-blue-400 transition-colors duration-300 interactive"
                onClick={toggleNav}
              >
                {item}
              </a>
            ))}
            
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors interactive"
            >
              <Download size={16} />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;