import React, { useEffect, useRef } from 'react';
import ThreeScene from '../ThreeScene';
import FloatingIcons from '../FloatingIcons';
import TypingTitle from '../TypingTitle';
import gsap from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titles = ['Full Stack Developer', 'Backend Developer'];
  
  // Initial animations
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        '.typing-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.cta-button',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        '.scroll-indicator',
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          delay: 1.5, 
          ease: 'power3.out',
          yoyo: true,
          repeat: -1,
        }
      );

      // Add hover animation for CTA button
      const ctaButton = document.querySelector('.cta-button');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    }
  }, []);
  
  const scrollToIdeaGenerator = () => {
    const ideaGeneratorSection = document.getElementById('idea-generator');
    if (ideaGeneratorSection) {
      ideaGeneratorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white"
    >
      <div className="absolute inset-0 z-0">
        <ThreeScene className="w-full h-full" />
      </div>
      
      <FloatingIcons />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4">
          Abhinav Kumar
        </h1>
        
        <TypingTitle titles={titles} />
        
        <p className="hero-description max-w-2xl mx-auto text-lg text-gray-300 mb-8">
          A passionate developer with expertise in Python, JavaScript, and various frameworks.
          Building robust backend solutions and optimizing system performance.
        </p>

        <button
          onClick={scrollToIdeaGenerator}
          className="cta-button inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Sparkles size={20} />
          Generate Your Project Roadmap
        </button>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <a 
          href="#about" 
          className="scroll-indicator inline-block text-white interactive hidden md:inline-block"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;