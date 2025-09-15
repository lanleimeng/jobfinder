import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface SettingsProps {
  user: { email: string };
  onLogout: () => void;
}

export function Settings({ user, onLogout }: SettingsProps) {
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Email updated successfully!');
    setIsSaving(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsSaving(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion would be processed here');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Settings */}
          <form onSubmit={handleEmailUpdate}>
            <div className="space-y-4">
              <h3 className="font-semibold">Email Address</h3>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSaving || email === user.email}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? 'Updating...' : 'Update Email'}
              </Button>
            </div>
          </form>

          <Separator />

          {/* Password Settings */}
          <form onSubmit={handlePasswordUpdate}>
            <div className="space-y-4">
              <h3 className="font-semibold">Change Password</h3>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>

          <Separator />

          {/* Account Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Account Actions</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onLogout}
                variant="outline"
              >
                Sign Out
              </Button>
              
              <Button 
                onClick={handleDeleteAccount}
                variant="destructive"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your JobFinder experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive emails about new job matches</p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Weekly Reports</h4>
              <p className="text-sm text-gray-600">Get weekly summaries of your job search activity</p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Data Export</h4>
              <p className="text-sm text-gray-600">Download your resume data and job analysis results</p>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Information */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Data</CardTitle>
          <CardDescription>
            Information about how we handle your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>Your resume data is encrypted and stored securely</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>We never share your personal information with third parties</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>You can delete your account and all associated data at any time</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">✓</span>
              <span>All job analysis is performed using secure, privacy-focused AI models</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="link" className="p-0 text-primary">
              Read our Privacy Policy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}