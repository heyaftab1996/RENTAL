import React, { useEffect, useState } from "react";
import hidcoLogo from "../assets/hidco-logo.png";
import { HomeIcon, BookOpenIcon, ShoppingCartIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Navbar, Collapse, Button, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  return { token, isAuthenticated: !!token };
};

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/login');
  };

  const fetchUserDetails = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/api/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const getCartItemCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(cartItems.length);
  };

  useEffect(() => {
    fetchUserDetails();
    getCartItemCount();
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center space-x-4">
          <img src={hidcoLogo} className="h-9" alt="Hidco logo" />
          <Link
            to="/"
            className={`flex flex-col items-center p-2 transition-colors duration-300 ${location.pathname === '/' ? 'text-green-600' : 'text-gray-800'} hover:text-green-600`}
          >
            <HomeIcon className="h-6 w-6 mb-1" />
            <span>Home</span>
          </Link>
          {user && (
            <Link
              to="/booking"
              className={`flex flex-col items-center p-2 transition-colors duration-300 ${location.pathname === '/booking' ? 'text-green-600' : 'text-gray-800'} hover:text-green-600`}
            >
              <BookOpenIcon className="h-6 w-6 mb-1" />
              <span>Bookings</span>
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <div className="flex gap-2 items-center">
              <Link to="/profile">
                <Button variant="text" size="sm" color="blue-gray" className="flex items-center gap-1">
                  <UserIcon className="h-6 w-6" /> Profile
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="text" size="sm" color="blue-gray" className="flex items-center gap-1">
                  <ShoppingCartIcon className="h-6 w-6" /> Cart
                  {cartCount > 0 && <span className="text-green-700">({cartCount})</span>}
                </Button>
              </Link>
              <Button
                variant="text"
                size="sm"
                color="blue-gray"
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" /> Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="text" size="sm" color="blue-gray">
                  Log In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="gradient" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Collapse open={openNav} className="lg:hidden absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg w-48">
        <div className="flex flex-col">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-200">
                <UserIcon className="h-6 w-6 text-green-700 mr-2" />
                Profile
              </Link>
              <Link to="/cart" className="flex items-center px-4 py-2 hover:bg-gray-200">
                <ShoppingCartIcon className="h-6 w-6 text-green-700 mr-2" />
                Cart  {cartCount > 0 && <span className="text-green-700">({cartCount})</span>}
              </Link>
              <Button
                variant="text"
                size="sm"
                color="red"
                onClick={handleLogout}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-200"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-green-700 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 hover:bg-gray-200">
                <Button variant="text" size="sm" color="blue-gray">
                  Log In
                </Button>
              </Link>
              <Link to="/sign-up" className="px-4 py-2 hover:bg-gray-200">
                <Button variant="gradient" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
