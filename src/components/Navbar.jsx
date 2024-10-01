import React from "react";
import hidcoLogo from "../assets/hidco-logo.png";
import { HomeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  UserIcon,
} from '@heroicons/react/24/solid';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current pathname

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup existing Google Translate elements and scripts
    const cleanUpGoogleTranslate = () => {
      const existingScript = document.getElementById("google-translate-script");
      if (existingScript) {
        existingScript.remove();
      }

      const existingTranslateElement = document.getElementById("google_translate_element");
      if (existingTranslateElement) {
        existingTranslateElement.innerHTML = '';
      }
    };

    cleanUpGoogleTranslate();

    // Load Google Translate script
    const loadGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    const googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en', // Your default language
          includedLanguages: 'bn', // Bengali language code
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      }
    };

    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = googleTranslateElementInit;
      loadGoogleTranslateScript();
    } else {
      googleTranslateElementInit();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanUpGoogleTranslate();
    };
  }, []);

  return (
    <Navbar className="mx-auto px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center space-x-4">
          <img src={hidcoLogo} className="h-9" alt="Hidco logo" />
          <Link
            to="/"
            className={`flex flex-col items-center p-2 transition-colors duration-300 ${
              location.pathname === '/' ? 'text-green-600' : 'text-gray-800'
            } hover:text-green-600`}
          >
            <HomeIcon className="h-6 w-6 mb-1" />
            <span>Home</span>
          </Link>
          {user && (
            <Link
              to="/booking"
              className={`flex flex-col items-center p-2 transition-colors duration-300 ${
                location.pathname === '/booking' ? 'text-green-600' : 'text-gray-800'
              } hover:text-green-600`}
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
              <Link to="/profile" className="bg-gray-300 rounded-full p-1">
                <UserIcon className="h-6 w-6 text-green-700" />
              </Link>
              <Link className="bg-red-500 hover:bg-red-600 flex justify-center items-center rounded-md text-white px-3 py-1 font-semibold" onClick={handleLogout}>
                Logout
              </Link>
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
              <Button
                variant="text"
                size="sm"
                color="red"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
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
