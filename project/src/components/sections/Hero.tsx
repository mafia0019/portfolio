import React, { useEffect, useRef } from 'react';
import ThreeScene from '../ThreeScene';
import FloatingIcons from '../FloatingIcons';
import TypingTitle from '../TypingTitle';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

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
    }
  }, []);
  
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
        
        <p className="hero-description max-w-2xl mx-auto text-lg text-gray-300">
          A passionate developer with expertise in Python, JavaScript, and various frameworks.
          Building robust backend solutions and optimizing system performance.
        </p>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <a 
          href="#about" 
          className="scroll-indicator inline-block text-white interactive"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;