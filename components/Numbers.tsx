import { numbersData } from '@/constants';
import React from 'react';

const Numbers = () => {
  return (
    <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-5 justify-center items-center bg-white py-10 w-full shadow mx-auto'>
      {numbersData.map((number) => (
        <div
          className='flex flex-col items-center justify-center text-center'
          key={number.id}
        >
          <h2 className='md:text-7xl text-4xl font-semibold'>
            {number.amount}
          </h2>
          <div className='flex flex-col'>
            <p className='md:text-sm text-xs'>{number.title1}</p>
            <p className='md:text-sm text-xs'>{number.title2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
