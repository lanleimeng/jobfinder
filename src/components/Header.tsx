import React from 'react';
import { Button } from './ui/button';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;   // <- renamed for clarity
  onSignUpClick: () => void;  // <- new prop
  onLogout: () => void;
}

export function Header({ isLoggedIn, onLoginClick, onSignUpClick, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-primary">JobFinder</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Button onClick={onLogout} variant="outline">
                Logout
              </Button>
            ) : (
              <>
                <Button onClick={onLoginClick} variant="outline">
                  Log In
                </Button>
                <Button onClick={onSignUpClick} className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
