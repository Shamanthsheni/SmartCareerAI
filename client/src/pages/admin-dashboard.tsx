import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../hooks/use-auth";
import { Users, Brain, MessageCircle, Trophy, TrendingUp, BookOpen, MapPin, Award, ArrowUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const keyMetrics = [
  { 
    icon: Users, 
    label: "Total Students", 
    value: "2,847", 
    change: "+12%", 
    color: "bg-blue-500",
    trend: "up"
  },
  { 
    icon: Brain, 
    label: "Quizzes Completed", 
    value: "1,924", 
    change: "+8%", 
    color: "bg-green-500",
    trend: "up"
  },
  { 
    icon: MessageCircle, 
    label: "AI Interactions", 
    value: "15,632", 
    change: "+24%", 
    color: "bg-purple-500",
    trend: "up"
  },
  { 
    icon: Trophy, 
    label: "Success Rate", 
    value: "89%", 
    change: "+3%", 
    color: "bg-orange-500",
    trend: "up"
  }
];

const districtData = [
  { name: "Srinagar", students: 847, percentage: 85, color: "#3b82f6" },
  { name: "Jammu", students: 623, percentage: 72, color: "#10b981" },
  { name: "Baramulla", students: 412, percentage: 58, color: "#8b5cf6" },
  { name: "Kupwara", students: 298, percentage: 45, color: "#f59e0b" },
  { name: "Others", students: 667, percentage: 35, color: "#06b6d4" }
];

const careerInterests = [
  { title: "Engineering & Technology", percentage: 32, students: 912, color: "#3b82f6", icon: "💻" },
  { title: "Teaching & Education", percentage: 24, students: 683, color: "#10b981", icon: "🎓" },
  { title: "Civil Services", percentage: 18, students: 512, color: "#8b5cf6", icon: "🏛️" },
  { title: "Healthcare & Medicine", percentage: 15, students: 427, color: "#f59e0b", icon: "🏥" },
  { title: "Business & Commerce", percentage: 11, students: 313, color: "#ef4444", icon: "💼" }
];

const monthlyGrowth = [
  { month: "Jan", students: 1200, interactions: 8500, assessments: 890 },
  { month: "Feb", students: 1450, interactions: 9800, assessments: 1120 },
  { month: "Mar", students: 1680, interactions: 11200, assessments: 1350 },
  { month: "Apr", students: 1950, interactions: 12800, assessments: 1580 },
  { month: "May", students: 2280, interactions: 14100, assessments: 1760 },
  { month: "Jun", students: 2560, interactions: 15200, assessments: 1890 },
  { month: "Jul", students: 2847, interactions: 15632, assessments: 1924 }
];

const collegeEngagement = [
  { name: "NIT Srinagar", views: 1250, applications: 340, interest: 95 },
  { name: "University of Jammu", views: 980, applications: 280, interest: 82 },
  { name: "Government Medical College", views: 760, applications: 190, interest: 88 },
  { name: "GDC Srinagar", views: 650, applications: 220, interest: 76 },
  { name: "Islamic University", views: 520, applications: 150, interest: 71 }
];

const CHART_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">This section is only accessible to administrators.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-blue-100">Comprehensive insights into platform usage and student success</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`${metric.color} p-6 text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <div className="text-3xl font-bold">{metric.value}</div>
                      <div className="text-white/90">{metric.label}</div>
                    </div>
                    <div className={`w-16 h-16 ${metric.color.replace('bg-', 'bg-').replace('-500', '-400/30')} rounded-full flex items-center justify-center`}>
                      <metric.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm relative z-10">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    <span>{metric.change} from last month</span>
                  </div>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-32 h-32 -top-8 -right-8 absolute rounded-full border-4 border-white/20" />
                    <div className="w-24 h-24 -bottom-6 -left-6 absolute rounded-full border-4 border-white/20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* District Usage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Usage by District
                    </h3>
                    <div className="space-y-6">
                      {districtData.map((district, index) => (
                        <div key={district.name} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-card-foreground">{district.name}</span>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium w-16 text-right">{district.students} students</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-full bg-muted rounded-full h-3">
                              <motion.div
                                className="h-3 rounded-full"
                                style={{ backgroundColor: district.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${district.percentage}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                              />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">
                              {district.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Popular Career Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Most Popular Career Interests
                    </h3>
                    <div className="space-y-6">
                      {careerInterests.map((career, index) => (
                        <motion.div
                          key={career.title}
                          className="flex items-center space-x-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                        >
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${career.color}20` }}>
                            {career.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-card-foreground">{career.title}</h4>
                            <div className="flex items-center justify-between mt-2">
                              <div className="w-32 bg-muted rounded-full h-2">
                                <motion.div
                                  className="h-2 rounded-full"
                                  style={{ backgroundColor: career.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(career.percentage / 32) * 100}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 + 0.6 }}
                                />
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold" style={{ color: career.color }}>
                                  {career.percentage}%
                                </div>
                                <div className="text-xs text-muted-foreground">{career.students} students</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Monthly Growth Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Platform Growth Over Time
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyGrowth}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Area type="monotone" dataKey="students" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                        <Area type="monotone" dataKey="interactions" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="students" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Student Demographics */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Student Demographics</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={districtData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="students"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {districtData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Assessment Completion Rates */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Assessment Completion Rates</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Career Assessment</span>
                        <span className="font-semibold">87%</span>
                      </div>
                      <Progress value={87} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Skill Evaluation</span>
                        <span className="font-semibold">76%</span>
                      </div>
                      <Progress value={76} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>College Preferences</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <Progress value={92} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>AI Chat Engagement</span>
                        <span className="font-semibold">68%</span>
                      </div>
                      <Progress value={68} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="colleges" className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  College Engagement Analytics
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={collegeEngagement} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={100} />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Bar dataKey="views" fill="#3b82f6" name="Profile Views" />
                      <Bar dataKey="applications" fill="#10b981" name="Applications" />
                      <Bar dataKey="interest" fill="#8b5cf6" name="Interest Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Key Performance Indicators
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} name="Students" />
                      <Line type="monotone" dataKey="interactions" stroke="#10b981" strokeWidth={3} name="AI Interactions" />
                      <Line type="monotone" dataKey="assessments" stroke="#8b5cf6" strokeWidth={3} name="Assessments" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
