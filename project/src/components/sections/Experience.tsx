import React, { useEffect, useRef } from 'react';
import { staggerItems, fadeInUp } from '../../utils/animations';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Backend Developer',
    company: 'Encardio Rite',
    period: 'Apr 2025 - Present',
    location: 'New Delhi, India',
    description: [
      'Maintain and develop backend of company website.',
      'Build and optimize GeoHub platform for real-time geotechnical monitoring.',
      'Develop API services, improve server performance.',
      'Collaborate with design and hardware teams for live data integration.',
      'Troubleshoot and improve system efficiency.'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Savatarr Technologies',
    period: 'Apr 2022 - Present',
    location: 'Hybrid',
    description: [
      'Led client platform development (GodrejProfessional) — 5,000+ users.',
      'Optimized dashboards, cut page load by 40%.',
      'Developed Astarcoin cryptocurrency exchange.',
      'Built invoicing systems and automation scripts (e.g., Zoom automation).',
      'Reverse engineered mobile apps for tracking and security improvements.',
      'Developed Android app for real-time sensor data collection.'
    ]
  },
  {
    title: 'Web Developer Intern',
    company: 'GIMIT',
    period: 'May 2020 - Jun 2020',
    location: 'Remote',
    description: [
      'Built responsive UI and optimized backend queries.',
      'Reduced front-end load times by 35%, improved database access by 20%.'
    ]
  }
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp('.experience-title', 0.2);
      staggerItems('.experience-list', '.experience-item', 0.2);
    }
  }, []);
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 bg-gray-900 text-white"
    >
      <div className="container mx-auto px-4">
        <h2 className="experience-title text-3xl md:text-4xl font-bold text-center mb-12">
          Work Experience
        </h2>
        
        <div className="experience-list max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="experience-item mb-12 relative pl-6 md:pl-0"
            >
              <div className="md:flex items-start">
                <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
                  <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
                  <p className="text-lg font-medium">{exp.company}</p>
                  <div className="flex items-center mt-2 text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center mt-1 text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    <span>{exp.location}</span>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:border-l md:border-gray-700 md:pl-6">
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {index < experiences.length - 1 && (
                <div className="hidden md:block absolute left-1/3 top-full h-8 w-px bg-gray-700"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;