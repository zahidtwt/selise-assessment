import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between bg-gray-800 py-4 px-6 mb-4'>
      <div className='flex items-center'>
        <a href='/' className='text-white text-lg font-semibold'>
          Cricket Game
        </a>
      </div>
      <div className='flex items-center space-x-4'>
        <a
          href='/matches'
          className='text-white hover:text-gray-300 text-sm font-medium'>
          All Matches
        </a>
        <a
          href='/'
          className='text-white hover:text-gray-300 text-sm font-medium'>
          Play Game
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
