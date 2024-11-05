import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Call the API with the token in the Authorization header
        const response = await axios.get('http://localhost:3000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Check if the user response is valid and has necessary fields
        if (response.data && response.data.user && response.data.user.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Handle any error (e.g., token expired or invalid)
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [token]);

  if (isAuthenticated === null) {
    // Optionally render a loading state while authentication is being checked
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Navigate to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected children if authenticated
  return children;
};

export default ProtectedRoute;
