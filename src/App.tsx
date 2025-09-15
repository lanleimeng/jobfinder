import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';

interface User {
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setUser({ email });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isLoggedIn={!!user}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}