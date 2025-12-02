import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const validatePassword = (pwd) => {
    const errors = {};
    if (pwd.length < 8) {
      errors.length = 'Minimal 8 karakter';
    }
    if (!/\d/.test(pwd)) {
      errors.digit = 'Harus mengandung 1 angka';
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      errors.special = 'Harus mengandung 1 tanda baca';
    }
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const pwdErrors = validatePassword(password);
    
    if (Object.keys(pwdErrors).length > 0) {
      setErrors(pwdErrors);
      return;
    }

    if (!username.trim()) {
      setErrors({ username: 'Username harus diisi' });
      return;
    }

    setErrors({});
    login(username);
    nav('/');
  };

  return (
    <div className="pt-2 pb-36 min-h-screen flex flex-col">
      <Header title="Moodify" subtitle="Login to continue" />
      <div className="px-5 flex-1 flex flex-col justify-center">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-300 to-purple-500 flex items-center justify-center text-white text-5xl mx-auto">
            😊
          </div>
          <h1 className="text-2xl font-bold mt-4 text-gray-800">Moodify</h1>
          <p className="text-gray-600 text-sm mt-2">Your daily mood tracker</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card">
          <h3 className="font-semibold mb-6 text-lg text-center">Silakan Login</h3>
          
          <div className="mb-5">
            <label className="text-sm text-gray-600 block mb-2 font-medium">Username</label>
            <input
              type="text"
              className="input w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">❌ {errors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600 block mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 text-lg"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              <strong>Syarat password:</strong><br/>
              • Min 8 karakter<br/>
              • Min 1 angka (0-9)<br/>
              • Min 1 tanda baca (!@#$%^&* dll)
            </p>
            {errors.length && <p className="text-red-500 text-xs mt-2">❌ {errors.length}</p>}
            {errors.digit && <p className="text-red-500 text-xs mt-2">❌ {errors.digit}</p>}
            {errors.special && <p className="text-red-500 text-xs mt-2">❌ {errors.special}</p>}
          </div>

          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Demo: gunakan password dengan format yang sesuai
        </p>
      </div>
    </div>
  );
}
