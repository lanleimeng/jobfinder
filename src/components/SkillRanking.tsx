import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface SkillRankingProps {
  resumeData: any;
}

export function SkillRanking({ resumeData }: SkillRankingProps) {
  const skillCategories = {
    'Programming Languages': ['JavaScript', 'Python', 'TypeScript'],
    'Frameworks & Libraries': ['React', 'Node.js'],
    'Tools & Technologies': ['Git', 'AWS', 'SQL']
  };

  const getSkillLevel = (percentage: number) => {
    if (percentage >= 85) return { label: 'Expert', color: 'bg-green-100 text-green-700' };
    if (percentage >= 70) return { label: 'Advanced', color: 'bg-blue-100 text-blue-700' };
    if (percentage >= 55) return { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Beginner', color: 'bg-gray-100 text-gray-600' };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 55) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  if (!resumeData || !resumeData.skills) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skill Analysis</CardTitle>
          <CardDescription>Upload your resume to see your skill rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No skills data available</p>
            <p className="text-sm">Upload your resume to see detailed skill analysis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const skills = resumeData.skills;
  const sortedSkills = Object.entries(skills).sort(([,a], [,b]) => (b as number) - (a as number));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skill Rankings</CardTitle>
          <CardDescription>
            Your skills analyzed and ranked based on your resume and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(skillCategories).map(([category, categorySkills]) => {
              const relevantSkills = sortedSkills.filter(([skill]) => 
                categorySkills.includes(skill)
              );

              if (relevantSkills.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-600">
                    {category}
                  </h3>
                  <div className="space-y-4">
                    {relevantSkills.map(([skill, percentage]) => {
                      const level = getSkillLevel(percentage as number);
                      return (
                        <div key={skill} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{skill}</span>
                              <Badge className={level.color}>
                                {level.label}
                              </Badge>
                            </div>
                            <span className="text-sm font-semibold">{}%</span>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage as number)}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Uncategorized Skills */}
            {(() => {
              const categorizedSkills = Object.values(skillCategories).flat();
              const uncategorizedSkills = sortedSkills.filter(([skill]) => 
                !categorizedSkills.includes(skill)
              );

              if (uncategorizedSkills.length === 0) return null;

              return (
                <div>
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-600">
                    Other Skills
                  </h3>
                  <div className="space-y-4">
                    {uncategorizedSkills.map(([skill, percentage]) => {
                      const level = getSkillLevel(percentage as number);
                      return (
                        <div key={skill} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{skill}</span>
                              <Badge className={level.color}>
                                {level.label}
                              </Badge>
                            </div>
                            <span className="text-sm font-semibold">{}%</span>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage as number)}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Insights</CardTitle>
          <CardDescription>Recommendations to improve your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">🎯 Strengths</h4>
              <p className="text-sm text-green-700">
                Your strongest skills are {sortedSkills.slice(0, 2).map(([skill]) => skill).join(' and ')}. 
                These are valuable assets that make you competitive in the market.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📈 Growth Areas</h4>
              <p className="text-sm text-blue-700">
                Consider strengthening skills like cloud platforms (AWS, Azure) and modern frameworks 
                to increase your market value and job opportunities.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">💡 Trending Skills</h4>
              <p className="text-sm text-yellow-700">
                Skills in AI/ML, DevOps, and cloud-native development are currently in high demand. 
                Consider adding these to your learning roadmap.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}