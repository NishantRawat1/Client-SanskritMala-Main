import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, active, linkto, className }) => {
  const buttonStyles = `text-center text-sm px-6 py-3 rounded-md font-bold 
    ${active ? "bg-orange text-black" : "bg-richblack-800 text-white"} 
    hover:scale-95 transition-all duration-200 ${className}`;

  return (
    <Link to={linkto} className="inline-block">
      <div className={buttonStyles}>
        {children}
      </div>
    </Link>
  );
};

export default Button;