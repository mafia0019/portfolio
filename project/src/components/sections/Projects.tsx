import React, { useEffect, useRef } from 'react';
import { staggerItems, fadeInUp } from '../../utils/animations';
import { Code, ExternalLink, Users, ShoppingCart, Database, Activity } from 'lucide-react';

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  icon: React.ElementType;
}

const projects: ProjectItem[] = [
  {
    title: 'Godrej Professional',
    description: 'Platform for professional hair care products with 5,000+ active users. Features include product management, Form building, and user analytics.',
    technologies: ['PHP', 'Laravel', 'Composer', 'SQL'],
    link: 'https://godrejprofessional.com/',
    icon: ShoppingCart
  },
  {
    title: 'GeoHub Platform',
    description: 'Real-time geotechnical monitoring system for environmental data analysis.',
    technologies: ['Node', 'Typescript', 'Supabase', 'Python'],
    icon: Activity
  },
  {
    title: 'Astarcoin Exchange',
    description: 'Cryptocurrency exchange platform with secure transaction processing.',
    technologies: ['Node.js', 'Express', 'MySQL', 'Angular'],
    icon: Database
  },
  {
    title: 'Online Movie Booking System',
    description: 'A movie ticketing app with admin movie management and dynamic booking.',
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JS', 'Bootstrap'],
    icon: Users
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp('.projects-title', 0.2);
      staggerItems('.project-grid', '.project-card', 0.15);
    }
  }, []);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="projects-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Projects
        </h2>
        
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={index}
                className="project-card bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 interactive"
              >
                <div 
                  className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <Icon size={48} className="text-white relative z-10" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors interactive"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;