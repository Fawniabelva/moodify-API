import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMood from './pages/AddMood';
import History from './pages/History';
import DetailMood from './pages/DetailMood';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{paddingBottom: '100px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMood />} />
          <Route path="/history" element={<History />} />
          <Route path="/detail/:id" element={<DetailMood />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
}
