import React from 'react';
import Header from '../components/Header';

export default function Profile(){
  return (
    <div className="pt-2 pb-36">
      <Header title="Profile" subtitle="About Moodify" />
      <div className="px-5">
        <div className="glass-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-300 to-purple-500 flex items-center justify-center text-white text-2xl">F</div>
            <div>
              <div className="font-semibold">Fawnia Belvandrya Naira Aqla 	</div>
              <div className="text-sm text-gray-500">Creator</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Moodify a calm, elegant daily mood tracker built with React, Supabase and PWA features. This project is part of a practical assignment.</p>
        </div>
      </div>
    </div>
  );
}
