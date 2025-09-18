import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Play, Users, BookOpen, MessageCircle, University, Brain, CheckCircle, Trophy, GraduationCap } from "lucide-react";
import { colleges } from "../data/colleges";

const stats = [
  { value: "5000+", label: "Students Guided" },
  { value: "200+", label: "Career Paths" },
  { value: "95%", label: "Success Rate" }
];

const features = [
  {
    icon: Brain,
    title: "AI Career Assessment",
    description: "Advanced 20-question quiz powered by Google Gemini AI that analyzes your personality, interests, and skills to suggest perfect career matches.",
    highlights: ["Real-time AI analysis", "Personalized recommendations"],
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: University,
    title: "J&K College Directory",
    description: "Comprehensive database of colleges across Jammu & Kashmir with detailed information about courses, fees, and admission requirements.",
    highlights: ["200+ colleges listed", "Advanced filtering options"],
    gradient: "from-green-500 to-teal-600"
  },
  {
    icon: MessageCircle,
    title: "AI Chat Counselor",
    description: "24/7 AI-powered career counselor that understands local J&K opportunities and provides contextual guidance for your career journey.",
    highlights: ["Local context awareness", "Instant responses"],
    gradient: "from-orange-500 to-red-600"
  }
];

const districts = [
  { name: "Srinagar", users: 847, percentage: 85 },
  { name: "Jammu", users: 623, percentage: 72 },
  { name: "Baramulla", users: 412, percentage: 58 },
  { name: "Kupwara", users: 298, percentage: 45 },
  { name: "Others", users: 667, percentage: 35 }
];

const careers = [
  { title: "Engineering & Technology", percentage: 32, color: "blue" },
  { title: "Teaching & Education", percentage: 24, color: "green" },
  { title: "Civil Services", percentage: 18, color: "purple" },
  { title: "Healthcare & Medicine", percentage: 15, color: "orange" }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Your <span className="text-yellow-300">AI-Powered</span><br />
                  Career Journey Starts Here
                </h1>
                <p className="text-xl text-blue-100 max-w-lg">
                  Personalized career guidance for students in Jammu & Kashmir. 
                  Discover your perfect career path with AI-driven insights and local opportunities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-gray-50 text-primary px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
                    data-testid="button-start-journey"
                  >
                    <Rocket className="mr-2 w-5 h-5" />
                    Start My Journey
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
                  data-testid="button-watch-demo"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:pl-12"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-effect shadow-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Career Assessment Progress</h3>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">85% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <motion.div 
                        className="bg-blue-50 p-4 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                      >
                        <div className="text-2xl font-bold text-blue-600">Engineering</div>
                        <div className="text-sm text-blue-500">92% Match</div>
                      </motion.div>
                      <motion.div 
                        className="bg-green-50 p-4 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 }}
                      >
                        <div className="text-2xl font-bold text-green-600">Teaching</div>
                        <div className="text-sm text-green-500">87% Match</div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-300/20 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-20 w-16 h-16 bg-white/20 rounded-full"
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Intelligent Career Guidance Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI-powered tools designed specifically for students in Jammu & Kashmir
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 shadow-lg card-hover border">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-card-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="text-green-500 mr-2 w-4 h-4" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* College Directory Preview */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">J&K College Directory</h2>
            <p className="text-xl text-muted-foreground">Comprehensive database of colleges across Jammu & Kashmir</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {colleges.slice(0, 2).map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 shadow-lg card-hover border">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">{college.name}</h3>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <span>{college.district}, J&K</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          college.type === 'Government' ? 'bg-green-100 text-green-800' :
                          college.type === 'Central University' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {college.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold">{college.ratings.overall}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">125 reviews</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Popular Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.courses.slice(0, 3).map((course, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {course.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">₹{(college.courses[0]?.annualFees / 1000).toFixed(0)}K</div>
                      <div className="text-sm text-blue-600">Annual Fees</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{college.placementStats.placementRate}%</div>
                      <div className="text-sm text-green-600">Placement Rate</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="flex-1" data-testid={`button-view-college-${college.id}`}>
                      View Details
                    </Button>
                    <Button variant="outline" size="icon" data-testid={`button-favorite-${college.id}`}>
                      ♥
                    </Button>
                    <Button variant="outline" size="icon" data-testid={`button-share-${college.id}`}>
                      ↗
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/colleges">
              <Button variant="outline" size="lg" data-testid="button-view-all-colleges">
                View All Colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Platform Impact</h2>
            <p className="text-xl text-muted-foreground">Real data showing our reach across Jammu & Kashmir</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* District Usage */}
            <Card className="p-8 shadow-lg border">
              <h3 className="text-xl font-semibold text-card-foreground mb-6">Usage by District</h3>
              <div className="space-y-4">
                {districts.map((district, index) => (
                  <motion.div 
                    key={district.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-muted-foreground">{district.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-muted rounded-full h-3">
                        <motion.div 
                          className="bg-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${district.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{district.users}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Popular Careers */}
            <Card className="p-8 shadow-lg border">
              <h3 className="text-xl font-semibold text-card-foreground mb-6">Most Popular Career Interests</h3>
              <div className="space-y-6">
                {careers.map((career, index) => (
                  <motion.div 
                    key={career.title}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-16 h-16 bg-${career.color}-100 rounded-2xl flex items-center justify-center`}>
                      {career.title.includes('Engineering') && <Brain className={`text-${career.color}-600 w-6 h-6`} />}
                      {career.title.includes('Teaching') && <BookOpen className={`text-${career.color}-600 w-6 h-6`} />}
                      {career.title.includes('Civil') && <Trophy className={`text-${career.color}-600 w-6 h-6`} />}
                      {career.title.includes('Healthcare') && <Users className={`text-${career.color}-600 w-6 h-6`} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{career.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <motion.div 
                            className={`bg-${career.color}-500 h-2 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(career.percentage / 32) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-sm font-medium">{career.percentage}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-white w-4 h-4" />
                </div>
                <span className="font-bold text-xl">SmartCareer AI</span>
              </div>
              <p className="text-slate-300 max-w-sm">
                Empowering students in Jammu & Kashmir with AI-powered career guidance and personalized education pathways.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Features</h3>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/quiz" className="hover:text-white transition-colors">AI Career Assessment</Link></li>
                <li><Link href="/colleges" className="hover:text-white transition-colors">College Directory</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Chat Counselor</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Student Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Parent Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Articles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-slate-300">
                <li>support@smartcareerai.com</li>
                <li>+91 194 XXX XXXX</li>
                <li>Srinagar, Jammu & Kashmir</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2024 SmartCareer AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
