import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-lg font-bold">AK</span>
        </div>
        
        <p className="text-gray-400 mb-4">
          &copy; {new Date().getFullYear()} Abhinav Kumar. All rights reserved.
        </p>
        
        <div className="flex justify-center items-center text-sm text-gray-500">
          <span>Made with</span>
          <Heart size={14} className="mx-1 text-red-500" />
          <span>using React, GSAP & Three.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;