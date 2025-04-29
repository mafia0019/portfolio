import React, { useEffect, useRef } from 'react';
import { staggerItems, fadeInUp } from '../../utils/animations';
import { BookOpen, Calendar } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

const educationData: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Application',
    institution: 'SGTBIMIT, GGSIPU',
    year: '2018-2021',
    location: 'Delhi, India'
  },
  {
    degree: 'Senior Secondary',
    institution: 'GreenFields Public School',
    year: '2018',
    location: 'Delhi, India'
  },
  {
    degree: 'Secondary',
    institution: 'GreenFields Public School',
    year: '2016',
    location: 'Delhi, India'
  }
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp('.education-title', 0.2);
      staggerItems('.education-list', '.education-item', 0.2);
    }
  }, []);
  
  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-20 bg-gray-800 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="education-title text-3xl md:text-4xl font-bold text-center mb-12">
          Education
        </h2>
        
        <div className="education-list max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <div 
              key={index}
              className="education-item relative mb-10 last:mb-0"
            >
              <div className="bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="md:flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">{edu.degree}</h3>
                    <div className="flex items-center mb-2">
                      <BookOpen size={18} className="mr-2 text-gray-400" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-gray-400" />
                      <span>{edu.year}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 px-4 py-2 bg-gray-900 rounded-full text-sm">
                    {edu.location}
                  </div>
                </div>
              </div>
              
              {index < educationData.length - 1 && (
                <div className="absolute left-6 top-full h-6 w-px bg-blue-400"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;