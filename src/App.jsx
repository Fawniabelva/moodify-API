import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import AddMood from './pages/AddMood';
import History from './pages/History';
import DetailMood from './pages/DetailMood';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Logout from './pages/Logout';
import EditProfile from './pages/EditProfile';   
import BottomNav from './components/BottomNav';

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>

      <div style={{ paddingBottom: isLoggedIn ? '100px' : '0' }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* PROTECTED ROUTES */}

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddMood /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/detail/:id" element={<ProtectedRoute><DetailMood /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


          {/* ROUTE BARU — EDIT PROFILE */}
          <Route 
            path="/edit-profile" 
            element={<ProtectedRoute><EditProfile /></ProtectedRoute>} 
          />
        </Routes>
      </div>

      {isLoggedIn && <BottomNav />}
    </BrowserRouter>
  );
}
