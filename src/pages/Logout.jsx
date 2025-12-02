import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Logout() {
  const { logout, username } = useAuth();
  const nav = useNavigate();

  const handleConfirmLogout = () => {
    logout();
    nav('/login');
  };

  const handleCancel = () => {
    nav('/profile');
  };

  return (
    <div className="pt-2 pb-36 min-h-screen flex flex-col">
      <Header title="Logout" subtitle="Confirm logout" />
      <div className="px-5 flex-1 flex flex-col justify-center">
        <div className="glass-card text-center">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-xl font-semibold mb-2">Logout?</h2>
          <p className="text-gray-600 mb-2">Apakah Anda yakin ingin keluar?</p>
          <p className="text-sm text-gray-500 mb-6">
            Username: <span className="font-semibold text-gray-700">{username}</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="btn-primary flex-1 bg-gray-400 hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              onClick={handleConfirmLogout}
              className="btn-primary flex-1 bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
