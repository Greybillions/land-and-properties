import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonialsData } from '@/constants';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className='py-10 relative px-3 bg-white'>
      <div className='relative'>
        <h2 className='text-center text-2xl md:text-5xl font-semibold'>
          What Our Customers are Saying
        </h2>
        <p className='text-center text-sm md:text-lg md:pt-3'>
          Our goal at Assets.ng is to provide you with the best real estate
          services, our clients&apos; happiness is our top priority.
        </p>
        <div className='flex relative flex-col w-full h-[200px] my-10 items-center justify-center'>
          <Carousel className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <CarouselContent>
              {testimonialsData.map((data) => (
                <CarouselItem key={data.id}>
                  <div className='flex flex-col bg-[#ccd2cd] px-[3px] md:px-6 py-4 rounded-3xl gap-3 items-center'>
                    <p className='text-center text-sm md:text-lg'>
                      {data.message}
                    </p>
                    <div className='flex flex-col items-center'>
                      <p className='font-semibold'>{data.name}</p>
                      <p>{data.location}</p>
                    </div>
                    {/* Star Rating */}
                    <div className='flex items-center justify-center text-yellow-500 w-[65px]'>
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
