import { useEffect } from 'react';
import { useCursor } from '../contexts/CursorContext';

export function useHoverEffect(selector: string) {
  const { setCursorType } = useCursor();
  
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    const handleMouseEnter = () => {
      setCursorType('hover');
    };
    
    const handleMouseLeave = () => {
      setCursorType('default');
    };
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [selector, setCursorType]);
}