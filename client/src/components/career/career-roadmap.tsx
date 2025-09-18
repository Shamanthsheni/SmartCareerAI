import { motion } from "framer-motion";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoadmapStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
  completed: boolean;
}

interface CareerRoadmapProps {
  roadmap: RoadmapStep[];
}

export default function CareerRoadmap({ roadmap }: CareerRoadmapProps) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-card-foreground mb-4">Career Roadmap</h4>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />
        
        {/* Roadmap Steps */}
        <div className="space-y-8">
          {roadmap.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Step Circle */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${
                  step.completed 
                    ? 'bg-green-500' 
                    : index === 0 
                      ? 'bg-blue-500' 
                      : index === 1 
                        ? 'bg-purple-500' 
                        : 'bg-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  )}
                </div>
                {step.completed && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-xl font-semibold text-card-foreground">{step.title}</h5>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.timeline}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  {/* Step Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {step.completed ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : index === 0 ? (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          <Clock className="w-3 h-3 mr-1" />
                          Current Step
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Upcoming
                        </Badge>
                      )}
                    </div>
                    
                    {index < roadmap.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Success Metrics */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: roadmap.length * 0.1 + 0.2 }}
      >
        <h5 className="font-semibold text-blue-800 mb-3">Expected Outcomes</h5>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">₹6-12L</div>
            <div className="text-sm text-blue-600">Starting Salary</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-green-100">
            <div className="text-2xl font-bold text-green-600">₹20L+</div>
            <div className="text-sm text-green-600">5-Year Potential</div>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-purple-600">Success Rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
