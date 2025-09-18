import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Brain, CheckCircle, Lightbulb } from "lucide-react";
import { quizQuestions } from "../data/quiz-questions";
import { useAuth } from "../hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../services/api";

interface QuizResponse {
  questionId: string;
  answer: string;
  aiAnalysis?: {
    interests: string[];
    careerSuggestions: string[];
    personalityTraits: string[];
    analysis: string;
    confidenceScore: number;
  };
}

export default function CareerQuiz() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showAIInsight, setShowAIInsight] = useState(false);
  const [aiInsight, setAiInsight] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const submitResponseMutation = useMutation({
    mutationFn: async (data: { userId: string; questionId: string; answer: string }) => {
      const response = await apiRequest("POST", "/api/quiz-analysis", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAiInsight(data.aiAnalysis);
      setShowAIInsight(true);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to analyze your response. Please try again.",
        variant: "destructive"
      });
    }
  });

  const generateRecommendationsMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest("POST", "/api/generate-recommendations", { userId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Assessment Complete!",
        description: "Your career recommendations are ready.",
      });
      setLocation("/recommendations");
    }
  });

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
    setShowAIInsight(false);
  };

  const handleNext = async () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Answer Required",
        description: "Please provide an answer before continuing.",
        variant: "destructive"
      });
      return;
    }

    // Submit response for AI analysis
    if (user) {
      submitResponseMutation.mutate({
        userId: user.id,
        questionId: currentQuestion.id,
        answer: currentAnswer
      });
    }

    // Save response locally
    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      answer: currentAnswer
    };
    
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = newResponse;
    setResponses(updatedResponses);

    // Move to next question or finish quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer("");
    } else {
      // Quiz complete - generate recommendations
      if (user) {
        generateRecommendationsMutation.mutate(user.id);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentAnswer(responses[currentQuestionIndex - 1]?.answer || "");
      setShowAIInsight(false);
    }
  };

  useEffect(() => {
    // Load previous answer when navigating
    const existingResponse = responses[currentQuestionIndex];
    if (existingResponse) {
      setCurrentAnswer(existingResponse.answer);
    }
  }, [currentQuestionIndex, responses]);

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
            <div className="space-y-4">
              {currentQuestion.options?.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex items-center p-4 border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors group"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} className="mr-4" data-testid={`radio-option-${index}`} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">{option.split(' - ')[0]}</div>
                        {option.includes(' - ') && (
                          <div className="text-sm text-muted-foreground">{option.split(' - ')[1]}</div>
                        )}
                      </div>
                    </div>
                  </Label>
                </motion.div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'text':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Textarea
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Share your thoughts in detail..."
              className="min-h-32 text-base"
              data-testid="textarea-answer"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Tip: The more detailed your answer, the better our AI can understand your preferences.
            </p>
          </motion.div>
        );

      case 'scale':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="px-4">
              <Slider
                value={[parseInt(currentAnswer) || 5]}
                onValueChange={(values) => handleAnswerChange(values[0].toString())}
                max={10}
                min={1}
                step={1}
                className="w-full"
                data-testid="slider-scale"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>1</span>
              <span className="text-center">
                Current: <strong>{currentAnswer || "5"}</strong>
              </span>
              <span>10</span>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl overflow-hidden border">
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold">Career Assessment Quiz</h1>
                  <p className="text-indigo-100">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{Math.round(progress)}%</div>
                  <div className="text-indigo-200">Complete</div>
                </div>
              </div>
              
              <div className="mt-4">
                <Progress 
                  value={progress} 
                  className="h-3 bg-indigo-800/30"
                />
              </div>
            </div>

            {/* Question Content */}
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-card-foreground mb-4">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.description && (
                      <p className="text-muted-foreground">
                        {currentQuestion.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    {renderQuestionInput()}
                  </div>

                  {/* AI Insight Box */}
                  <AnimatePresence>
                    {showAIInsight && aiInsight && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-400 mb-8"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                            <Brain className="text-green-600 w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                              <Lightbulb className="w-4 h-4 mr-1" />
                              AI Insight
                            </h3>
                            <p className="text-green-700 text-sm mb-3">
                              {aiInsight.analysis}
                            </p>
                            {aiInsight.careerSuggestions?.length > 0 && (
                              <div className="space-y-1">
                                <p className="text-green-800 font-medium text-sm">Potential Career Matches:</p>
                                <div className="flex flex-wrap gap-1">
                                  {aiInsight.careerSuggestions.map((career: string, index: number) => (
                                    <span key={index} className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                                      {career}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      data-testid="button-previous"
                    >
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="text-sm text-muted-foreground">
                      {currentQuestionIndex + 1} / {quizQuestions.length}
                    </div>

                    <Button
                      onClick={handleNext}
                      disabled={!currentAnswer.trim() || submitResponseMutation.isPending}
                      data-testid="button-next"
                    >
                      {submitResponseMutation.isPending ? (
                        "Analyzing..."
                      ) : currentQuestionIndex === quizQuestions.length - 1 ? (
                        <>
                          Complete Assessment
                          <CheckCircle className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Next Question
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
