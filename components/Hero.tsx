import React from 'react';
import Image from 'next/image';
import { heroImages } from '@/constants';

const Hero = () => {
  return (
    <div className='flex md:h-[80vh] h-[70vh] relative z-5 mx-3'>
      <div className='text flex flex-col justify-center items-center lg:w-1/2 w-full'>
        <p className='text-sm md:text-md'>welcome to our home</p>
        <div className='flex flex-col my-6'>
          <h1 className='lg:text-8xl text-5xl font-semibold'>Smart</h1>
          <h1 className='lg:text-8xl text-5xl ml-7 font-semibold'>Property</h1>
          <h1 className='lg:text-8xl text-5xl font-semibold'>Investments</h1>
        </div>
        <p className='text-sm md:text-md'>
          Transform Your Real Estate Experience with Us
        </p>
        <button className='bg-primary text-white px-6 py-3 mt-6 transition-all hover:opacity-[0.95] rounded-full'>
          Get Started
        </button>
        <div className='md:flex hidden mt-10 gap-2'>
          {heroImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt='hero'
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
      <div className='lg:flex hidden img w-1/2 h-full bg-hero-bg relative overflow-hidden bg-center bg-cover bg-no-repeat'></div>
    </div>
  );
};

export default Hero;
