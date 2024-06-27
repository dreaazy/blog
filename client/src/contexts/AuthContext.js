// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
