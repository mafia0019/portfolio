import React, { useEffect, useRef } from 'react';
import { skillIcons } from '../utils/icons';

const FloatingIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const iconsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };

      // Update each icon's position based on mouse position
      iconsRef.current.forEach((icon) => {
        if (!icon) return;

        const rect = icon.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;
        
        const dx = mousePosition.current.x - iconCenterX;
        const dy = mousePosition.current.y - iconCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          
          const repelX = -Math.cos(angle) * force * 50;
          const repelY = -Math.sin(angle) * force * 50;
          
          icon.style.transform = `translate(${repelX}px, ${repelY}px) scale(${icon.dataset.scale || 1})`;
        } else {
          // Reset position when mouse is far away
          icon.style.transform = `scale(${icon.dataset.scale || 1})`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      {skillIcons.map((icon, index) => {
        // Generate random values for each icon
        const duration = 20 + Math.random() * 10;
        const delay = index * 0.2;
        const xOffset = (Math.random() - 0.5) * 200;
        const yOffset = (Math.random() - 0.5) * 200;
        const rotation = (Math.random() - 0.5) * 90;
        const scale = 0.8 + Math.random() * 0.4;
        const opacity = 0.2 + Math.random() * 0.2;

        return (
          <div 
            key={index}
            ref={(el) => {
              if (el) iconsRef.current[index] = el;
            }}
            className="absolute transform-gpu transition-transform duration-300 floating-icon"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity,
              transform: `scale(${scale})`,
              animation: `
                float ${duration}s ease-in-out ${delay}s infinite alternate,
                rotate ${duration * 1.5}s linear ${delay}s infinite
              `,
              '--x-offset': `${xOffset}px`,
              '--y-offset': `${yOffset}px`,
              '--rotation': `${rotation}deg`,
            } as React.CSSProperties}
            data-scale={scale}
          >
            <img 
              src={icon.image} 
              alt={icon.name}
              className={`w-10 h-10 object-contain filter dark:brightness-90 ${icon.color}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;