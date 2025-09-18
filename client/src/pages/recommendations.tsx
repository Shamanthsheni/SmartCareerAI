import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "../hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, BookOpen, DollarSign, Clock, ArrowRight, Star, Target, Briefcase, MessageCircle } from "lucide-react";
import CareerRoadmap from "../components/career/career-roadmap";

interface CareerRecommendation {
  id: string;
  careerTitle: string;
  matchPercentage: number;
  description: string;
  requirements: string[];
  salaryRange: { min: number; max: number };
  roadmap: Array<{
    step: string;
    title: string;
    description: string;
    timeline: string;
    completed: boolean;
  }>;
}

export default function Recommendations() {
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['/api/career-recommendations', user?.id],
    enabled: !!user?.id
  });

  // Mock data for demonstration when API doesn't return data
  const mockRecommendations: CareerRecommendation[] = [
    {
      id: "1",
      careerTitle: "Software Engineering",
      matchPercentage: 94,
      description: "Perfect match for your logical thinking and problem-solving skills. High demand in J&K's growing IT sector with excellent remote work opportunities.",
      requirements: ["B.Tech Computer Science", "Programming Skills", "Problem-solving mindset", "Continuous learning attitude"],
      salaryRange: { min: 600000, max: 1200000 },
      roadmap: [
        { step: "1", title: "Complete Class 12", description: "Focus on Mathematics and Physics with 85%+ marks", timeline: "Current Year", completed: false },
        { step: "2", title: "Engineering Entrance", description: "Prepare for JEE Main and secure admission", timeline: "Next 6 months", completed: false },
        { step: "3", title: "B.Tech Admission", description: "Join Computer Science program at NIT Srinagar or other top colleges", timeline: "2024-2028", completed: false },
        { step: "4", title: "Skill Development", description: "Learn programming languages, build projects, complete internships", timeline: "During College", completed: false },
        { step: "5", title: "Career Launch", description: "Join tech companies or start your own venture", timeline: "Post Graduation", completed: false }
      ]
    },
    {
      id: "2", 
      careerTitle: "Data Science",
      matchPercentage: 89,
      description: "Excellent alignment with your analytical skills and interest in technology. Growing field with applications in government and private sectors.",
      requirements: ["Statistics/Mathematics background", "Programming skills", "Data analysis tools", "Business understanding"],
      salaryRange: { min: 700000, max: 1500000 },
      roadmap: [
        { step: "1", title: "Foundation Building", description: "Strong math and statistics background", timeline: "1-2 years", completed: false },
        { step: "2", title: "Programming Skills", description: "Learn Python, R, SQL for data analysis", timeline: "6-12 months", completed: false },
        { step: "3", title: "Specialization", description: "Master data science tools and machine learning", timeline: "1-2 years", completed: false },
        { step: "4", title: "Portfolio Development", description: "Work on real projects and build portfolio", timeline: "Ongoing", completed: false },
        { step: "5", title: "Professional Role", description: "Join as data scientist or analyst", timeline: "Post training", completed: false }
      ]
    },
    {
      id: "3",
      careerTitle: "Teaching & Education",
      matchPercentage: 82,
      description: "Great communication skills and passion for helping others. High demand for qualified teachers in J&K with government job security.",
      requirements: ["Subject expertise", "B.Ed qualification", "Communication skills", "Patience and empathy"],
      salaryRange: { min: 350000, max: 700000 },
      roadmap: [
        { step: "1", title: "Graduate Degree", description: "Complete B.A/B.Sc in your preferred subject", timeline: "3 years", completed: false },
        { step: "2", title: "B.Ed Qualification", description: "Complete Bachelor of Education program", timeline: "1-2 years", completed: false },
        { step: "3", title: "TET Preparation", description: "Prepare for Teacher Eligibility Test", timeline: "6 months", completed: false },
        { step: "4", title: "Teaching Experience", description: "Start with private tutoring or substitute teaching", timeline: "1-2 years", completed: false },
        { step: "5", title: "Permanent Position", description: "Secure government or reputed private school job", timeline: "Ongoing", completed: false }
      ]
    }
  ];

  const displayRecommendations = (recommendations && Array.isArray(recommendations) ? recommendations : mockRecommendations) || mockRecommendations;

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 70) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const formatSalary = (amount: number) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}L`;
    }
    return `₹${(amount / 100000).toFixed(0)}K`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Please Login</h2>
            <p className="text-muted-foreground">Complete your career assessment first to see recommendations.</p>
            <Link href="/quiz">
              <Button className="mt-4" data-testid="button-take-quiz">Take Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p>Generating your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Career Recommendations</h1>
          <p className="text-xl text-muted-foreground">AI-generated career matches based on your assessment</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommendations List */}
          <div className="lg:col-span-2 space-y-6">
            {displayRecommendations.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`card-hover cursor-pointer ${selectedCareer === career.id ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-semibold text-card-foreground">{career.careerTitle}</h3>
                          <Badge className={`${getMatchColor(career.matchPercentage)} border`}>
                            {career.matchPercentage}% Match
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{career.description}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold text-yellow-600">{career.matchPercentage}%</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <DollarSign className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="font-semibold text-blue-800">
                            {formatSalary(career.salaryRange.min)} - {formatSalary(career.salaryRange.max)}
                          </div>
                          <div className="text-sm text-blue-600">Expected Salary</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <BookOpen className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-800">{career.requirements.length} Requirements</div>
                          <div className="text-sm text-green-600">Skills Needed</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                        <Clock className="w-8 h-8 text-purple-600" />
                        <div>
                          <div className="font-semibold text-purple-800">{career.roadmap.length} Steps</div>
                          <div className="text-sm text-purple-600">Career Path</div>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Requirements</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.requirements.map((req, i) => (
                          <Badge key={i} variant="outline" className="bg-accent/50">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button
                        className="flex-1"
                        onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
                        data-testid={`button-view-roadmap-${career.id}`}
                      >
                        {selectedCareer === career.id ? "Hide Roadmap" : "View Career Roadmap"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button variant="outline" data-testid={`button-save-career-${career.id}`}>
                        Save
                      </Button>
                    </div>

                    {/* Expandable Roadmap */}
                    {selectedCareer === career.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-border"
                      >
                        <CareerRoadmap roadmap={career.roadmap} />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assessment Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Assessment Summary
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Questions Completed</span>
                        <span>20/20</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-3">Top Strengths Identified</h4>
                      <div className="space-y-2">
                        <Badge variant="outline" className="w-full justify-start bg-blue-50 text-blue-700 border-blue-200">
                          Logical Thinking
                        </Badge>
                        <Badge variant="outline" className="w-full justify-start bg-green-50 text-green-700 border-green-200">
                          Problem Solving
                        </Badge>
                        <Badge variant="outline" className="w-full justify-start bg-purple-50 text-purple-700 border-purple-200">
                          Communication
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-primary" />
                    Recommended Actions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium text-blue-800">Explore Colleges</div>
                        <div className="text-sm text-blue-600 mb-2">Research colleges for your top career match</div>
                        <Link href="/colleges">
                          <Button size="sm" variant="outline" data-testid="button-explore-colleges">
                            Browse Colleges
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <div className="font-medium text-green-800">Skill Development</div>
                        <div className="text-sm text-green-600 mb-2">Start building relevant skills early</div>
                        <Button size="sm" variant="outline" data-testid="button-skill-resources">
                          View Resources
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-medium text-purple-800">Get Guidance</div>
                        <div className="text-sm text-purple-600 mb-2">Chat with our AI counselor</div>
                        <Link href="/dashboard">
                          <Button size="sm" variant="outline" data-testid="button-chat-counselor">
                            Start Chat
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
