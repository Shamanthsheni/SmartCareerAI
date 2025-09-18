import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Brain, BookOpen, MessageCircle, Target, TrendingUp, Calendar, Award, ArrowRight } from "lucide-react";
import AIChatCounselor from "../components/career/ai-chat";

export default function StudentDashboard() {
  const { user } = useAuth();

  const quickStats = [
    { icon: Brain, label: "Quizzes Taken", value: "3", color: "bg-blue-500" },
    { icon: Target, label: "Career Matches", value: "5", color: "bg-green-500" },
    { icon: BookOpen, label: "Colleges Explored", value: "12", color: "bg-purple-500" },
    { icon: MessageCircle, label: "AI Chats", value: "24", color: "bg-orange-500" }
  ];

  const careerMatches = [
    {
      title: "Software Engineering",
      match: 94,
      description: "Perfect match for your logical thinking",
      color: "green",
      icon: "💻"
    },
    {
      title: "Data Science", 
      match: 89,
      description: "Aligns with analytical skills",
      color: "blue",
      icon: "📊"
    },
    {
      title: "Teaching",
      match: 82,
      description: "Great communication skills detected",
      color: "purple",
      icon: "🎓"
    }
  ];

  const nextSteps = [
    {
      icon: Brain,
      title: "Complete Assessment",
      description: "5 questions remaining",
      action: "Continue Quiz",
      href: "/quiz",
      color: "yellow"
    },
    {
      icon: BookOpen,
      title: "Explore Colleges",
      description: "View recommended colleges",
      action: "Browse Colleges", 
      href: "/colleges",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Chat with AI Counselor",
      description: "Get personalized guidance",
      action: "Start Chat",
      href: "#",
      color: "green"
    }
  ];

  const recentActivity = [
    { action: "Completed Career Assessment Question 15", time: "2 hours ago", icon: Brain },
    { action: "Viewed NIT Srinagar College Profile", time: "1 day ago", icon: BookOpen },
    { action: "Chat with AI Counselor about Engineering", time: "2 days ago", icon: MessageCircle },
    { action: "Generated Career Roadmap for Software Engineering", time: "3 days ago", icon: Target }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Please Login</h2>
            <p className="text-muted-foreground">You need to be logged in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4">
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face"}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-white/20"
              />
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-blue-100">Class 12, Science Stream | Srinagar</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">Level 3</div>
              <div className="text-blue-200">Career Explorer</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="grid md:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                        <stat.icon className="text-white w-6 h-6" />
                      </div>
                      <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Assessment Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold mb-6">Assessment Progress</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Career Assessment</span>
                        <span className="text-sm font-medium">15/20 completed</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground">Skill Evaluation</span>
                        <span className="text-sm font-medium">8/10 completed</span>
                      </div>
                      <Progress value={80} className="h-3" />
                    </div>

                    <div className="pt-4">
                      <Link href="/quiz">
                        <Button className="w-full" data-testid="button-continue-assessment">
                          Continue Assessment
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Career Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Top Career Matches</h2>
                    <Link href="/recommendations">
                      <Button variant="outline" size="sm" data-testid="button-view-all-matches">
                        View All
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {careerMatches.map((career, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center justify-between p-4 bg-${career.color}-50 rounded-lg border-l-4 border-${career.color}-500`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{career.icon}</div>
                          <div>
                            <div className={`font-medium text-${career.color}-800`}>{career.title}</div>
                            <div className={`text-sm text-${career.color}-600`}>{career.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold text-${career.color}-600`}>{career.match}%</div>
                          <div className={`text-xs text-${career.color}-500`}>Match</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 hover:bg-accent/50 rounded-lg transition-colors">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <activity.icon className="text-blue-600 w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-card-foreground">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Next Steps</h3>
                  <div className="space-y-4">
                    {nextSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-4 bg-${step.color}-50 rounded-lg border-l-4 border-${step.color}-400`}
                      >
                        <step.icon className={`text-${step.color}-500 mt-1 w-5 h-5`} />
                        <div className="flex-1">
                          <div className={`font-medium text-${step.color}-800`}>{step.title}</div>
                          <div className={`text-sm text-${step.color}-600 mb-2`}>{step.description}</div>
                          <Link href={step.href}>
                            <Button size="sm" variant="outline" data-testid={`button-${step.action.toLowerCase().replace(' ', '-')}`}>
                              {step.action}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Chat Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AIChatCounselor />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
