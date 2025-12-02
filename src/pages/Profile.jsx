import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Profile(){
  const { username } = useAuth();
  const nav = useNavigate();

  return (
    <div className="pt-2 pb-36">
      <Header title="Profile" subtitle="About Moodify" />
      <div className="px-5">
        <div className="glass-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-300 to-purple-500 flex items-center justify-center text-white text-2xl">F</div>
            <div>
              <div className="font-semibold">Fawnia Belvandrya Naira Aqla</div>
              <div className="text-sm text-gray-500">Creator</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Moodify a calm, elegant daily mood tracker built with React, Supabase and PWA features. This project is part of a practical assignment.</p>
        </div>

        <div className="glass-card mt-6">
          <h3 className="font-semibold mb-3">Account Info</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Logged in as:</p>
            <p className="font-semibold text-lg text-purple-600">{username}</p>
          </div>
          
          <button
            onClick={() => nav('/logout')}
            className="btn-primary w-full bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
