import React from 'react';

export default function Header({ title, subtitle }) {
  return (
    <div className="px-5 pt-6 pb-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{color:'#3b2f73'}}>{title}</h1>
          {subtitle && <p className="kicker mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
