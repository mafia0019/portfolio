import React, { useEffect, useRef } from 'react';
import { staggerItems, fadeInUp } from '../../utils/animations';
import { Mail, Linkedin, Phone } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp('.about-title', 0.2);
      fadeInUp('.about-content', 0.4);
      staggerItems('.contact-links', '.contact-item', 0.2);
    }
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="about-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          About Me
        </h2>
        
        <div className="about-content max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I'm a Backend Developer with expertise in building efficient and scalable systems. While my primary focus is on backend development, 
              I also have experience in full-stack development, allowing me to understand and contribute to the entire application stack. 
              With demonstrated adaptability and a strong willingness to learn, I'm ready to work in any 
              programming language or framework required for the role.
            </p>
            
            <div className="contact-links flex flex-wrap justify-center gap-6 mt-8">
              <a 
                href="mailto:abhinav8254@gmail.com" 
                className="contact-item flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors interactive"
              >
                <Mail size={20} />
                <span>abhinav8254@gmail.com</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/abhinav-vishnoi" 
                className="contact-item flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors interactive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
                <span>linkedin.com/in/abhinav-vishnoi</span>
              </a>
              
              <a 
                href="tel:+918802102728" 
                className="contact-item flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors interactive"
              >
                <Phone size={20} />
                <span>+91-8802102728</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;