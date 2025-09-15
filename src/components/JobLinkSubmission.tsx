import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface JobLinkSubmissionProps {
  jobLinks: string[];
  onAddJobLink: (link: string) => void;
}

export function JobLinkSubmission({ jobLinks, onAddJobLink }: JobLinkSubmissionProps) {
  const [jobUrl, setJobUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobUrl.trim()) return;

    try {
      // Validate URL
      new URL(jobUrl);
      
      setIsAnalyzing(true);
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onAddJobLink(jobUrl);
      setJobUrl('');
    } catch (error) {
      alert('Please enter a valid URL');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getJobStatus = (index: number) => {
    if (index === 0) return { label: 'Analyzed', color: 'bg-green-100 text-green-700' };
    if (index === 1) return { label: 'Processing', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Queued', color: 'bg-gray-100 text-gray-600' };
  };

  const extractDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Link Analysis</CardTitle>
          <CardDescription>
            Submit job posting URLs to analyze how well they match your skills and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="jobUrl" className="text-sm font-medium">
                Job Posting URL
              </label>
              <div className="flex space-x-2">
                <Input
                  id="jobUrl"
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="https://example.com/jobs/software-developer"
                  className="flex-1"
                  disabled={isAnalyzing}
                />
                <Button 
                  type="submit" 
                  disabled={isAnalyzing || !jobUrl.trim()}
                  className="bg-accent hover:bg-accent/90"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Later'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Job Links List */}
      <Card>
        <CardHeader>
          <CardTitle>Submitted Job Links ({jobLinks.length})</CardTitle>
          <CardDescription>
            Track the status of your job link analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {jobLinks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p>No job links submitted yet</p>
              <p className="text-sm">Add your first job link above to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {jobLinks.map((link, index) => {
                const status = getJobStatus(index);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {extractDomain(link)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {link}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={status.color}>
                        {status.label}
                      </Badge>
                      {status.label === 'Analyzed' && (
                        <Button size="sm" variant="outline">
                          View Results
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Submit job links from major job boards like LinkedIn, Indeed, or company career pages</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Our AI will analyze job requirements and match them against your skills</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Get personalized recommendations on how to improve your application</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Analysis typically takes 1-2 minutes per job posting</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}