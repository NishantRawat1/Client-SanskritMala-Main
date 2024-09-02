import React from 'react';
import university1 from '../assets/AICTE.png';
import university2 from '../assets/iitd.png';
import university3 from '../assets/niet.png';
import university4 from '../assets/kv.png';
import university5 from '../assets/du.png';
import university6 from '../assets/its.png';

import 'animate.css'; // Ensure to install animate.css
import HighlightText from './HighlightText';

const TrustedBySection = () => {
  return (
    <section className="py-10 bg-gray-100 px-4 md:py-20 md:px-8">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-3xl font-bold text-black animate__animated animate__fadeInUp">
          Trusted by <HighlightText text={"10000+"}/> students globally
        </h2>
      </div>
      <div className="flex flex-wrap justify-around items-center">
        <div className="flex justify-center w-1/3 md:w-1/6 p-4 animate__animated animate__fadeIn animate__delay-1s">
          <img
            src={university1}
            alt="University 1"
            className="h-12 md:h-16 lg:h-20 object-contain"
          />
        </div>
        <div className="flex justify-center w-1/3 md:w-1/6 p-4 animate__animated animate__fadeIn animate__delay-2s">
          <img
            src={university2}
            alt="University 2"
            className="h-16 md:h-20 lg:h-24 object-contain"
          />
        </div>
        <div className="flex justify-center w-1/3 md:w-1/6 p-4 animate__animated animate__fadeIn animate__delay-3s">
          <img
            src={university3}
            alt="University 3"
            className="h-12 md:h-16 lg:h-20 object-contain"
          />
        </div>
        <div className="flex justify-center w-1/3 md:w-1/6 p-4 animate__animated animate__fadeIn animate__delay-4s">
          <img
            src={university4}
            alt="University 4"
            className="h-16 md:h-20 lg:h-24 object-contain"
          />
        </div>
        <div className="flex justify-center w-1/3 md:w-1/6 p-4 animate__animated animate__fadeIn animate__delay-5s">
          <img
            src={university5}
            alt="University 5"
            className="h-16 md:h-20 lg:h-24 object-contain"
          />
        </div>
        <div className="flex justify-center w-1/3 md:w-1/6 p-4 animate__animated animate__fadeIn animate__delay-6s">
          <img
            src={university6}
            alt="University 6"
            className="h-14 md:h-16 lg:h-20 object-contain" // Increased height for the last logo
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
