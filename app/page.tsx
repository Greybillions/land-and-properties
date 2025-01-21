import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Numbers from '@/components/Numbers';
import Explore from '@/components/Explore';
import Getaways from '@/components/Getaways';

const page = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Hero />
        <Numbers />
        <Explore />
        <Getaways />
      </main>
      <Footer />
    </>
  );
};

export default page;
