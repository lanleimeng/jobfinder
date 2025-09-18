import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';

interface User {
  id?: string;
  name?: string;
  email: string;
  token?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Backend URL
  const API_URL = 'http://localhost:5000/api/auth';

  // LOGIN
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // for cookies/session
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser({ email, token: data.token, ...data.user });
      setShowAuthModal(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // REGISTER
  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setUser({ email, name, token: data.token, ...data.user });
      setShowAuthModal(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={!!user}
        onLoginClick={() => { setIsSignUpMode(false); setShowAuthModal(true); }}
        onSignUpClick={() => { setIsSignUpMode(true); setShowAuthModal(true); }}
        onLogout={handleLogout}
      />

      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onGetStarted={() => setShowAuthModal(true)} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        isSignUp={isSignUpMode}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
