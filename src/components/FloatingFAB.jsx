import React from 'react';
import { Link } from 'react-router-dom';

export default function FloatingFAB(){
  return (
    <div className="fixed bottom-36 right-6 z-50">
      <Link to="/add" className="inline-flex items-center justify-center w-14 h-14 rounded-full shadow-soft-lg" style={{background: 'linear-gradient(135deg,#7C5CFF,#B59CFF)', color:'#fff'}}>
        ➕
      </Link>
    </div>
  );
}
