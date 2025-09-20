import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ResumeUploadProps {
  onResumeUpload: (resumeData: any) => void;
}

export function ResumeUpload({ onResumeUpload }: ResumeUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
 const handleFileUpload = async (file: File) => {
    if (!file || (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx'))) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }

    setIsUploading(true);
    try {
      
      const formData = new FormData();
      formData.append('file', file);

      
      const res = await fetch('http://127.0.0.1:8000/process_resume', {
  method: 'POST',
  body: formData,
});

      
      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      
      const resumeData = await res.json();

    
      onResumeUpload(resumeData);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setIsDragOver(false);
  const file = e.dataTransfer.files?.[0];
  if (file) handleFileUpload(file);
};


const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) handleFileUpload(file);
};



  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>
          Upload your resume in PDF or DOCX format for AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium mb-1">
                  {isDragOver ? 'Drop your resume here' : 'Drag and drop your resume'}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  or click to browse (PDF, DOCX)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary hover:bg-primary/90"
                >
                  Choose File
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}