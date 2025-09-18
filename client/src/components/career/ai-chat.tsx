import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "../../hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../services/api";
import { Bot, User, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  message: string;
  isFromAI: boolean;
  createdAt: Date;
}

const quickQuestions = [
  "What are the best engineering colleges in J&K?",
  "How to prepare for government job exams?",
  "Career prospects in IT sector?",
  "Teaching opportunities in J&K?"
];

export default function AIChatCounselor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      message: "Hello! I'm your AI Career Counselor. I'm here to help you explore career opportunities in Jammu & Kashmir. What would you like to know about your career journey?",
      isFromAI: true,
      createdAt: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat-message", {
        userId: user?.id,
        message,
        response: "",
        isFromAI: false
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Add AI response to messages
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        message: data.response,
        isFromAI: true,
        createdAt: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    },
    onError: () => {
      setIsTyping(false);
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        message: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isFromAI: true,
        createdAt: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = (message: string = inputMessage) => {
    if (!message.trim() || !user) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      isFromAI: false,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Send to API
    sendMessageMutation.mutate(message.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Career Counselor</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-green-100 text-sm">Online & Ready to Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isFromAI ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.isFromAI ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isFromAI ? 'bg-green-100' : 'bg-primary/10'
                }`}>
                  {message.isFromAI ? (
                    <Bot className="w-4 h-4 text-green-600" />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.isFromAI 
                    ? 'bg-white shadow-sm rounded-tl-sm' 
                    : 'bg-primary text-primary-foreground rounded-tr-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSendMessage(question)}
                data-testid={`button-quick-question-${index}`}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about careers, colleges, or guidance..."
            disabled={sendMessageMutation.isPending}
            data-testid="input-chat-message"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || sendMessageMutation.isPending}
            size="icon"
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
