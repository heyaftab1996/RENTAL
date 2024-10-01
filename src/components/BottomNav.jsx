import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, KeyIcon } from '@heroicons/react/24/outline';

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full text-white">
      <div className="flex justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center w-1/2 p-2 ${
            location.pathname === '/' ? 'bg-green-600' : 'bg-cyan-800'
          } hover:bg-green-600`}
        >
          <HomeIcon className="h-6 w-6 mb-1" />
          <span>Home</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center w-1/2 p-2 ${
            location.pathname === '/profile' ? 'bg-green-600' : 'bg-cyan-800'
          } hover:bg-cyan-900`}
        >
          <BookOpenIcon className="h-6 w-6 mb-1" />
          <span>Bookings</span>
        </Link>
        {/* <Link
          to="/rentals"
          className={`flex flex-col items-center w-1/3 p-2 ${
            location.pathname === '/rentals' ? 'bg-green-600' : 'bg-cyan-800'
          } hover:bg-cyan-900`}
        >
          <KeyIcon className="h-6 w-6 mb-1" />
          <span>Rentals</span>
        </Link> */}
      </div>
    </div>
  );
};

export default BottomNav;
