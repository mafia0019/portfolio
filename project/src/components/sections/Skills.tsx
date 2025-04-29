import React, { useEffect, useRef, useState } from 'react';
import { staggerItems, fadeInUp } from '../../utils/animations';
import gsap from 'gsap';
import { skillIcons } from '../../utils/icons';

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    image: string;
    progress: number;
  }>;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: skillIcons.filter(icon => 
      ['Python', 'C++', 'JavaScript', 'PHP', 'TypeScript'].includes(icon.name)
    ).map(skill => ({
      ...skill,
      progress: Math.floor(Math.random() * 30) + 70 // Random progress between 70-100
    }))
  },
  {
    name: 'Frameworks',
    skills: skillIcons.filter(icon => 
      ['Django', 'Flask', 'Node.js', 'Express', 'Angular', 'React', 'Vue'].includes(icon.name)
    ).map(skill => ({
      ...skill,
      progress: Math.floor(Math.random() * 30) + 70
    }))
  },
  {
    name: 'Tools',
    skills: skillIcons.filter(icon => 
      ['Git', 'VS Code', 'Android Studio', 'Selenium', 'Postman', 'Cursor', 'Loveable', 'Replit'].includes(icon.name)
    ).map(skill => ({
      ...skill,
      progress: Math.floor(Math.random() * 30) + 70
    }))
  },
  {
    name: 'Database',
    skills: skillIcons.filter(icon => 
      ['Supabase', 'MySQL', 'MongoDB', 'PostgreSQL', 'Redis'].includes(icon.name)
    ).map(skill => ({
      ...skill,
      progress: Math.floor(Math.random() * 30) + 70
    }))
  }
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp('.skills-title', 0.2);
      staggerItems('.skill-categories', '.skill-category', 0.15);
      
      const skillCards = document.querySelectorAll('.skill-card');
      skillCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        
        // Add floating animation
        gsap.to(card, {
          y: -10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.1
        });
        
        // Add interactive hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }
  }, []);

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(selectedSkill === skillName ? null : skillName);
  };
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="skills-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Skills & Technologies
        </h2>
        
        <div className="skill-categories space-y-12 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">{category.name}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {category.skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="skill-card bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 interactive"
                    onClick={() => handleSkillClick(skill.name)}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 mb-4 flex items-center justify-center">
                        <img 
                          src={skill.image} 
                          alt={`${skill.name} logo`}
                          className="w-12 h-12 object-contain filter dark:brightness-90"
                        />
                      </div>
                      <span className="text-center font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      
                      {/* Progress Bar */}
                      <div 
                        className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden transition-all duration-300 ${
                          selectedSkill === skill.name ? 'h-2' : 'h-0'
                        }`}
                      >
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: selectedSkill === skill.name ? `${skill.progress}%` : '0%',
                            transition: 'width 1s ease-out'
                          }}
                        />
                      </div>
                      
                      {/* Progress Percentage */}
                      <span 
                        className={`text-sm text-gray-500 dark:text-gray-400 mt-1 transition-all duration-300 ${
                          selectedSkill === skill.name ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {skill.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Demonstrated adaptability and a strong willingness to learn, ready to work in any programming language or framework required for the role.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;