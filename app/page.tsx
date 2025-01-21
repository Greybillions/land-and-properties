import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Numbers from '@/components/Numbers';
import Explore from '@/components/Explore';
import Getaways from '@/components/Getaways';
import Testimonials from '@/components/Testimonials';

const page = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Hero />
        <Numbers />
        <Explore />
        <Getaways />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default page;
