import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/history', label: 'History', icon: '📜' },
  { to: '/add', label: 'Add', icon: '➕' },
  { to: '/stats', label: 'Stats', icon: '📊' },
  { to: '/profile', label: 'Profile', icon: '👤' }
];

export default function BottomNav(){
  const loc = useLocation().pathname;
  return (
    <nav className="navbar">
      {items.map(i => (
        <Link key={i.to} to={i.to} className={`nav-item ${loc === i.to ? 'active' : ''}`}>
          <div className="text-xl">{i.icon}</div>
          <div>{i.label}</div>
        </Link>
      ))}
    </nav>
  );
}
