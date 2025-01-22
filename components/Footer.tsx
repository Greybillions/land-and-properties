'use client';
import React from 'react';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-10 md:px-10 px-3'>
      <div className='container flex items-center md:justify-end justify-center'>
        <Input
          placeholder='Lets find a Home, Land'
          className='md:w-[25%] w-[90%] border-r-0 px-4 py-4 rounded-r-none bg-white text-black rounded-l-full text-sm'
        />
        <button
          type='submit'
          className='bg-primary relative w-[40%] md:w-[10%] text-white px-5 rounded-full md:-left-10 -left-4 py-1.5 z-10 transition-all hover:bg-[#31843c]'
        >
          Search
        </button>
      </div>
      <div className='container w-full flex text-center md:text-start items-center md:justify-start justify-center'>
        <p className='w-full text-sm md:text-base md:mt-0 mt-5'>
          Copyright &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
