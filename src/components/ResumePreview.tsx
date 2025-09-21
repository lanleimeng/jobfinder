import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ResumePreviewProps {
  resumeData: any;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    // Simulate saving to database
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!resumeData) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Resume Analysis Results</CardTitle>
                <CardDescription>
                  Parsed data from your resume - click to {isOpen ? 'collapse' : 'expand'}
                </CardDescription>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="font-semibold mb-3">Personal Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div><strong>Name:</strong> {resumeData.name}</div>
                  <div><strong>Email:</strong> {resumeData.email}</div>
                  <div><strong>Phone:</strong> {resumeData.phone}</div>
                  <div><strong>Location:</strong> {resumeData.location}</div>
                  {resumeData.summary && (
                    <div><strong>Summary:</strong> {resumeData.summary}</div>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-3">Skills Identified</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(resumeData.skills || {}).map(([skill]) => (
                    <Badge 
                      key={skill}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {skill} ({}%)
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-semibold mb-3">Work Experience</h3>
                <div className="space-y-4">
                  {resumeData.experience?.map((exp: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{exp.title}</h4>
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              {resumeData.education && (
                <div>
                  <h3 className="font-semibold mb-3">Education</h3>
                  <div className="space-y-4">
                    {resumeData.education.map((edu: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{edu.degree}</h4>
                            <p className="text-sm text-gray-600">{edu.school}</p>
                          </div>
                          <span className="text-sm text-gray-500">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleSave}
                  className={`${
                    isSaved 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  disabled={isSaved}
                >
                  {isSaved ? '✓ Saved to Database' : 'Save to Database'}
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}