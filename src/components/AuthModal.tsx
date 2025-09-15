import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
          <CardDescription>
            {isSignUp ? 'Sign up to get started with JobFinder' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>

            <div className="text-center space-y-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
              
              {!isSignUp && (
                <Button variant="link" className="text-sm">
                  Forgot password?
                </Button>
              )}
            </div>

            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}