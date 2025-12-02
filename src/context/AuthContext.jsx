import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('user_logged_in') === 'true';
    const storedUsername = localStorage.getItem('username');
    
    if (loggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    setIsLoading(false);
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('user_logged_in', 'true');
    localStorage.setItem('username', user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
