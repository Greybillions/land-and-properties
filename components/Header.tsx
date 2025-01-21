'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaMountain } from 'react-icons/fa';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className='container md:p-10 p-3 flex items-center justify-between w-full'>
      {/* Logo Section */}
      <Link className='flex gap-2 justify-center items-center' href='/'>
        <FaMountain className='text-4xl text-primary' />
        <h2 className='text-xl font-semibold'>Assets.ng</h2>
      </Link>

      {/* Desktop Navigation */}
      <div className='md:flex hidden text-lg gap-20 justify-end'>
        {headerLinks.map((link) => (
          <Link
            key={link.href}
            className='hover:text-primary transition-all'
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className='flex md:hidden relative z-20'>
        <button onClick={toggleMenu} aria-label='Toggle menu'>
          {menuOpen ? (
            <RxCross1 className='text-3xl transition-transform' />
          ) : (
            <RxHamburgerMenu className='text-3xl transition-transform' />
          )}
        </button>
      </div>

      {/* Sliding Menu */}
      <div
        className={`fixed z-10 top-0 right-0 h-screen w-3/4 bg-white shadow-lg transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className='flex flex-col items-center justify-center h-full gap-10 text-lg'>
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              className='hover:text-primary transition-all'
              href={link.href}
              onClick={() => setMenuOpen(false)} // Close menu on link click
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
