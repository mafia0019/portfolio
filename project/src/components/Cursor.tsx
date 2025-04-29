import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>([]);
  const isHovering = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initialize trail positions with 4 dots
    const trailCount = 4;
    trailPositions.current = Array(trailCount).fill({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
      gsap.to(cursor, {
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: isHovering.current ? 1.2 : 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    const animate = () => {
      if (!cursor) return;

      // Update cursor position with smooth easing
      gsap.to(cursor, {
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Update trail positions with increased spacing
      trailPositions.current.forEach((pos, index) => {
        const targetX = index === 0 ? mousePosition.current.x : trailPositions.current[index - 1].x;
        const targetY = index === 0 ? mousePosition.current.y : trailPositions.current[index - 1].y;
        
        // Increased spacing between dots
        pos.x += (targetX - pos.x) * (0.15 - (index * 0.03)); // Slower follow for later dots
        pos.y += (targetY - pos.y) * (0.15 - (index * 0.03));

        if (trailRefs.current[index]) {
          gsap.to(trailRefs.current[index], {
            x: pos.x,
            y: pos.y,
            duration: 0.1,
            ease: 'power2.out'
          });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>
      {Array(4).fill(0).map((_, index) => (
        <div
          key={index}
          ref={el => trailRefs.current[index] = el}
          className="fixed w-5 h-5 pointer-events-none z-40 mix-blend-difference"
          style={{
            transform: 'translate(-50%, -50%)',
            opacity: 1 - (index * 0.25), // More distinct fade out
          }}
        >
          <div className="w-full h-full bg-white rounded-full" />
        </div>
      ))}
    </>
  );
};

export default Cursor;