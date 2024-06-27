// src/utils/auth.js

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
}

export const getUserRole = () => {
  return localStorage.getItem('role');
}