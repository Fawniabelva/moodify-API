import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [lastLogin, setLastLogin] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load data saat pertama kali aplikasi dibuka
  useEffect(() => {
    const loggedIn = localStorage.getItem('user_logged_in') === 'true';

    const storedUsername = localStorage.getItem('username');
    const storedBio = localStorage.getItem('bio');
    const storedJoinDate = localStorage.getItem('join_date');
    const storedLastLogin = localStorage.getItem('last_login');

    if (storedUsername) setUsername(storedUsername);
    if (storedBio) setBio(storedBio);
    if (storedJoinDate) setJoinDate(storedJoinDate);
    if (storedLastLogin) setLastLogin(storedLastLogin);

    setIsLoggedIn(loggedIn && storedUsername);
    setIsLoading(false);
  }, []);

  // Login user
  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);

    const today = new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
    const now = new Date().toLocaleString();

    localStorage.setItem('user_logged_in', 'true');
    localStorage.setItem('username', user);

    if (!localStorage.getItem('join_date')) {
      localStorage.setItem('join_date', today);
      setJoinDate(today);
    }

    localStorage.setItem('last_login', now);
    setLastLogin(now);
  };

  // Logout user
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setBio('');

    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('username');
    localStorage.removeItem('bio');
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      username,
      bio,
      joinDate,
      lastLogin,

      setUsername,
      setBio,

      isLoading,
      logout,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}