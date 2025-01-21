import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default layout;
