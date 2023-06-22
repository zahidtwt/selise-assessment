import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between bg-gray-800 py-4 px-6 mb-4'>
      <div className='flex items-center'>
        <span className='text-white text-lg font-semibold'>Cricket Game</span>
      </div>
      <div className='flex items-center space-x-4'>
        <Link
          to='/matches'
          className='text-white hover:text-gray-300 text-sm font-medium'>
          All Matches
        </Link>
        <Link
          to='/'
          className='text-white hover:text-gray-300 text-sm font-medium'>
          Play Game
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
