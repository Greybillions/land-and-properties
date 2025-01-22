import React from 'react';
import Image from 'next/image';
import { heroImages } from '@/constants';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className='flex md:h-[80vh] h-[70vh] relative z-5 bg-hero-bg md:bg-none bg-cover bg-center bg-no-repeat'>
      <div className='text relative flex flex-col justify-center items-center lg:w-1/2 w-full'>
        {/* Dark Overlay for Smaller Devices */}
        <div className='absolute inset-0 bg-black/40 md:hidden z-0'></div>

        <p className='text-sm md:text-md text-white md:text-black z-10'>
          Welcome to our home
        </p>
        <div className='flex flex-col my-6 z-10 text-white md:text-black'>
          <h1 className='lg:text-8xl text-5xl font-semibold'>Real</h1>
          <h1 className='lg:text-8xl text-5xl ml-7 font-semibold'>Assets</h1>
          <h1 className='lg:text-8xl text-5xl font-semibold'>Nigeria</h1>
        </div>
        <p className='text-sm md:text-md z-10 text-white md:text-black'>
          Transform Your Real Estate Experience with Us
        </p>
        <Link
          href='/main/buy'
          className='bg-primary text-white px-6 py-3 md:mt-6 mt-20 transition-all hover:opacity-[0.95] rounded-full z-10'
        >
          Get Started
        </Link>
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
    </section>
  );
};

export default Hero;
