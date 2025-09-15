import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ResumeUpload } from './ResumeUpload';
import { ResumePreview } from './ResumePreview';
import { JobLinkSubmission } from './JobLinkSubmission';
import { SkillRanking } from './SkillRanking';
import { Settings } from './Settings';

interface DashboardProps {
  user: { email: string };
  onLogout: () => void;
}

export type ActiveSection = 'overview' | 'upload' | 'jobs' | 'skills' | 'settings';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [resumeData, setResumeData] = useState<any>(null);
  const [jobLinks, setJobLinks] = useState<string[]>([]);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'upload', label: 'Upload Resume', icon: '📄' },
    { id: 'jobs', label: 'Job Links', icon: '🔗' },
    { id: 'skills', label: 'Skills', icon: '⭐' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderMainContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <div className="space-y-6">
            <ResumeUpload onResumeUpload={setResumeData} />
            {resumeData && <ResumePreview resumeData={resumeData} />}
          </div>
        );
      case 'jobs':
        return <JobLinkSubmission jobLinks={jobLinks} onAddJobLink={(link) => setJobLinks([...jobLinks, link])} />;
      case 'skills':
        return <SkillRanking resumeData={resumeData} />;
      case 'settings':
        return <Settings user={user} onLogout={onLogout} />;
      default:
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none ">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-2">Welcome back!</h2>
                <p className="text-gray-600 mb-4">Ready to find your next opportunity?</p>
                <Button 
                  onClick={() => setActiveSection('upload')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Upload Your Resume
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest job search activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Resume uploaded</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Skills analyzed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Job match pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Your job search progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Skills Identified</span>
                      <span className="font-semibold">{resumeData ? Object.keys(resumeData.skills || {}).length : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Job Links Added</span>
                      <span className="font-semibold">{jobLinks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Profile Completeness</span>
                      <span className="font-semibold">{resumeData ? '85%' : '20%'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-16 h-16 mb-3">
                    <AvatarFallback className="bg-primary text-white text-lg">
                      {user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{user.email}</h3>
                  <p className="text-sm text-gray-500">Job Seeker</p>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeSection === item.id 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveSection(item.id as ActiveSection)}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {renderMainContent()}
          </div>

          {/* Right Info Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
                <CardDescription>Maximize your job search success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">💡 Resume Tip</h4>
                    <p className="text-xs text-gray-600">Include quantifiable achievements and relevant keywords.</p>
                  </div>
                  
                  <div className="p-3 bg-accent/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">🎯 Skill Focus</h4>
                    <p className="text-xs text-gray-600">Highlight skills that match your target job descriptions.</p>
                  </div>

                  <div className="p-3 bg-primary/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">🔍 Job Search</h4>
                    <p className="text-xs text-gray-600">Apply to 3-5 relevant positions daily for best results.</p>
                  </div>

                  <div className="p-3 bg-accent/5 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">📊 Track Progress</h4>
                    <p className="text-xs text-gray-600">Monitor your application success rate and adjust strategy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}