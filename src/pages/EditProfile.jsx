import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function EditProfile() {
  const nav = useNavigate();
  const { username, setUsername, bio, setBio } = useAuth();

  const [newName, setNewName] = useState(username);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    setNewBio(bio || "");
  }, [bio]);

  const handleSave = () => {
    setUsername(newName);
    localStorage.setItem("username", newName);

    setBio(newBio);
    localStorage.setItem("bio", newBio);

    nav('/profile');
  };

  return (
    <div className="pt-2 pb-24">
      <Header title="Edit Profile" subtitle="Update your information" />

      <div className="px-5">
        <div className="glass-card">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mt-1 w-full p-2 rounded-xl bg-white/50 outline-none"
          />

          <label className="text-sm font-medium mt-4 block">Bio</label>
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="mt-1 w-full p-2 rounded-xl bg-white/50 outline-none h-24"
            placeholder="Write something about yourself..."
          />

          <button
            onClick={handleSave}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}