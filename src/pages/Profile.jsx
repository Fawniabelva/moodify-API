import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Profile() {
  const { username, joinDate, lastLogin } = useAuth();
  const nav = useNavigate();

  // Dummy — nanti bisa ganti dari database
  const totalMoodEntries = 18;

  const bio = localStorage.getItem('bio') || "No bio added yet.";

  return (
    <div className="pt-2 pb-36">
      <Header title="Profile" subtitle="Your Account Details" />

      <div className="px-5">

        {/* USER CARD */}
        <div className="glass-card">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-300 to-purple-500 flex items-center justify-center text-white text-3xl">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>

            <div>
              <div className="font-semibold text-lg">{username}</div>
              <div className="text-sm text-gray-600 w-56">{bio}</div>
            </div>
          </div>

          <button
            onClick={() => nav('/edit-profile')}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl"
          >
            Edit Profile
          </button>
        </div>

        {/* ACCOUNT INFO */}
        <div className="glass-card mt-6">
          <h3 className="font-semibold mb-3">Account Info</h3>

          <div className="text-sm text-gray-600">
            <p><strong>Logged in as:</strong> {username}</p>
            <p><strong>Join Date:</strong> {joinDate || "-"}</p>
            <p><strong>Last Login:</strong> {lastLogin || "-"}</p>
            <p><strong>Total Mood Entries:</strong> {totalMoodEntries}</p>
            <p><strong>App Version:</strong> Moodify v1.0.0</p>
          </div>

          <button
            onClick={() => nav('/logout')}
            className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}