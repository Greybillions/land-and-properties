import React from 'react';
import { PiIntersectSquareDuotone, PiBathtub } from 'react-icons/pi';
import { CiLocationOn } from 'react-icons/ci';
import { TbBed } from 'react-icons/tb';
import Image from 'next/image';

import getawayImg from '@/public/hero3.jpg';
import Link from 'next/link';

const Getaways = () => {
  return (
    <section className='py-10 px-3 bg-white'>
      <div className='container flex flex-col items-center'>
        <h2 className='text-2xl md:text-5xl font-semibold'>
          Discover Getaways
        </h2>
        <p className='text-center text-sm md:text-lg md:pt-3'>
          Discover the allure of prime home hotspots, where every destination
          offers something truly special
        </p>
        <div className='bg-[#ccd2cd] mt-6 pb-6 rounded-t-2xl flex flex-col items-start'>
          <Image
            src={getawayImg}
            alt='getaways'
            width={800}
            height={400}
            className='rounded-t-3xl'
          />
          <div className='flex mt-6 px-6 flex-col md:flex-row md:gap-40 items-center'>
            <h2 className='text-xl md:text-3xl font-semibold'>
              Serene Haven Estates
            </h2>
            <p className='flex md:items-center md:self-center self-start mt-2 md:mt-0 gap-2'>
              <CiLocationOn className='text-xl' /> Lagos, Nigeria
            </p>
          </div>
          <div className='flex items-center gap-7 px-6 my-6 md:text-sm text-xs'>
            <p className='flex items-center gap-2'>
              <TbBed className='text-2xl' /> 3 Bedrooms
            </p>
            <p className='flex items-center gap-2'>
              <PiBathtub className='text-2xl' /> 2 Bathroom
            </p>
            <p className='flex items-center gap-2'>
              <PiIntersectSquareDuotone className='text-2xl' /> 400 sqft
            </p>
          </div>
          <div className='flex items-center w-full justify-between px-6 mt-6'>
            <p className='text-2xl font-semibold'>$12000.00</p>
            <Link
              href='/main/buy'
              className='bg-primary text-white md:text-md text-sm md:px-5 md:py-2 px-4 py-1 rounded-full transition-all hover:opacity-[0.95]'
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Getaways;
