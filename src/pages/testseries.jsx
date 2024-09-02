import React from 'react';
import construction from '../assets/construction.png'
const Test = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img 
        src={construction} 
        alt="Under Construction" 
        className="w-1/2 max-w-lg"
      />
    </div>
  );
};

export default Test;
