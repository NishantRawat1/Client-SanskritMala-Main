import React from 'react';
import heroImage from '../assets/hero.png'; // Adjust the path to your hero image
import CTAButton from '../components/button';
import HighlightText from '../components/HighlightText2';

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-18 md:py-15 lg:py-0 font-ancient bg-blue1 transition-all duration-500 ease-in-out mt-16 sm:mt-20 md:mt-24 lg:mt-20">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transform hover:scale-105 transition-all duration-500 ease-in-out">
          Embark on a Journey of Ancient Wisdom with <HighlightText text={"SanskritMala"} />
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white mb-8">
          Discover the timeless treasures of Sanskrit literature and learning. Dive into our rich collection and embrace the wisdom of ages.
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl font-semibold italic mb-6 text-white">
          विद्या सर्वस्य सौम्या – Knowledge is the path to grace
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-7 mt-8 lg:mt-10">
          <CTAButton active={true} linkto={"/about"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/register"}>
            Try for free
          </CTAButton>
        </div>
      </div>
      <div className="w-full lg:w-1/2 transform transition-all duration-500 ease-in-out hover:scale-105">
        <img src={heroImage} alt="Hero" className="w-full lg:w-auto rounded-md transition-all duration-500 ease-in-out" />
      </div>
    </section>
  );
};

export default HeroSection;
