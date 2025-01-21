import { exploreData } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuMoveUpRight } from 'react-icons/lu';

const Explore = () => {
  return (
    <section className='py-10 px-3 bg-white'>
      <div className='container flex flex-col items-center'>
        <h2 className='text-center text-2xl md:text-5xl  font-semibold'>
          Explore Designs That Redefine <br className='md:block hidden' />{' '}
          Conventional Space
        </h2>
        <p className='text-center text-sm md:text-lg md:pt-3'>
          Embark on a journey of collaboration where your dreams become
          architectural masterpieces
        </p>
        <div className='flex flex-col w-full md:max-w-[60%] my-10 items-center justify-center'>
          {exploreData.map((data) => (
            <div
              key={data.id}
              className='flex justify-between md:even:flex-row-reverse w-full items-center border-t border-b border-gray-300 border-dashed py-0.5'
            >
              <div className='flex items-center flex-row gap-3 justify-center'>
                <Image
                  src={data.img}
                  alt={data.title}
                  width={200}
                  height={100}
                />
                <h2 className='md:block hidden text-2xl text-semibold'>
                  {data.title}
                </h2>
                <div className='flex md:hidden flex-col gap-2'>
                  <h2>{data.title}</h2>
                  <Link
                    href={data.url}
                    className='bg-primary rounded-full p-2 w-10 h-10 flex items-center justify-center'
                  >
                    <LuMoveUpRight className='text-white rounded-full' />
                  </Link>
                </div>
              </div>
              <Link
                href={data.url}
                className='bg-primary rounded-full p-2 md:block hidden'
              >
                <LuMoveUpRight className='bg-primary text-white rounded-full w-6 h-6' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
