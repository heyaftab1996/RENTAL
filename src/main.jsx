import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@material-tailwind/react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Bbcc from './pages/Bbcc.jsx';
import HappyWorks from './pages/HappyWorks.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated.jsx';
import Dda from './pages/Dda.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Booking from './pages/booking.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NazrulTirtha from './pages/NazrulTirtha.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <App />
          // <ProtectedRoute>
          //   <App />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bbcc/book-now"
        element={
          <ProtectedRoute>
            <Bbcc />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dhono-dhono/book-now"
        element={
          <ProtectedRoute>
            <Dda />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nazrul-tirtha/book-now"
        element={
          <ProtectedRoute>
            <NazrulTirtha />
          </ProtectedRoute>
        }
      />
      <Route
        path="/happy-works/book-now"
        element={
          <ProtectedRoute>
            <HappyWorks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/sign-up"
        element={
          <RedirectIfAuthenticated>
            <SignUp />
          </RedirectIfAuthenticated>
        }
      />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      <ThemeProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
