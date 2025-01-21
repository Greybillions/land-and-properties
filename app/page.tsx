import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Numbers from '@/components/Numbers';

const page = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Hero />
        <Numbers />
      </main>
      <Footer />
    </>
  );
};

export default page;
