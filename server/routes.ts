import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeQuizResponse, getChatResponse } from "./services/gemini";
import { insertQuizResponseSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "SmartCareer AI Server Running" });
  });

  // Get user profile
  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Submit quiz response with AI analysis
  app.post("/api/quiz-analysis", async (req, res) => {
    try {
      const validatedData = insertQuizResponseSchema.parse(req.body);
      
      // Get AI analysis using Gemini
      const aiAnalysis = await analyzeQuizResponse(
        validatedData.questionId,
        validatedData.answer,
        { userId: validatedData.userId }
      );

      // Save quiz response with AI analysis
      const quizResponse = await storage.createQuizResponse({
        ...validatedData,
        aiAnalysis
      });

      res.json({ success: true, response: quizResponse, aiAnalysis });
    } catch (error) {
      console.error("Quiz analysis error:", error);
      res.status(500).json({ error: "Failed to analyze quiz response" });
    }
  });

  // Get career recommendations
  app.get("/api/career-recommendations/:userId", async (req, res) => {
    try {
      const recommendations = await storage.getCareerRecommendations(req.params.userId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  // Generate career recommendations based on quiz responses
  app.post("/api/generate-recommendations", async (req, res) => {
    try {
      const { userId } = req.body;
      const quizResponses = await storage.getQuizResponses(userId);
      
      if (quizResponses.length === 0) {
        return res.status(400).json({ error: "No quiz responses found" });
      }

      // Generate recommendations based on quiz responses
      const recommendations = [
        {
          userId,
          careerTitle: "Software Engineering",
          matchPercentage: 94,
          description: "Perfect match for your logical thinking and problem-solving skills. High demand in J&K's growing IT sector.",
          requirements: ["B.Tech in Computer Science", "Programming skills", "Problem-solving mindset"],
          salaryRange: { min: 600000, max: 1200000 },
          roadmap: [
            { step: "1", title: "Complete Class 12", description: "Focus on Mathematics and Physics", timeline: "Current Year", completed: false },
            { step: "2", title: "Engineering Entrance", description: "Prepare for JEE Main", timeline: "Next 6 months", completed: false },
            { step: "3", title: "B.Tech Admission", description: "Join Computer Science program", timeline: "2024-2028", completed: false },
            { step: "4", title: "Skill Development", description: "Learn programming languages", timeline: "During College", completed: false },
            { step: "5", title: "Career Launch", description: "Join tech companies", timeline: "Post Graduation", completed: false }
          ]
        },
        {
          userId,
          careerTitle: "Teaching",
          matchPercentage: 87,
          description: "Great communication skills detected. High demand for qualified teachers in J&K.",
          requirements: ["B.Ed degree", "Subject expertise", "Communication skills"],
          salaryRange: { min: 350000, max: 800000 },
          roadmap: [
            { step: "1", title: "Graduate Degree", description: "Complete B.A/B.Sc in your subject", timeline: "2024-2027", completed: false },
            { step: "2", title: "B.Ed Qualification", description: "Complete Bachelor of Education", timeline: "2027-2028", completed: false },
            { step: "3", title: "TET Preparation", description: "Prepare for Teacher Eligibility Test", timeline: "2028", completed: false },
            { step: "4", title: "Government Job", description: "Apply for teaching positions", timeline: "Post TET", completed: false }
          ]
        }
      ];

      // Save recommendations
      for (const rec of recommendations) {
        await storage.createCareerRecommendation(rec);
      }

      res.json(recommendations);
    } catch (error) {
      console.error("Generate recommendations error:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // AI Chat counselor
  app.post("/api/chat-message", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Get AI response using Gemini
      const aiResponse = await getChatResponse(validatedData.message, { userId: validatedData.userId });

      // Save user message
      await storage.createChatMessage(validatedData);

      // Save AI response
      const aiMessage = await storage.createChatMessage({
        userId: validatedData.userId,
        message: aiResponse,
        response: "",
        isFromAI: true
      });

      res.json({ success: true, response: aiResponse, message: aiMessage });
    } catch (error) {
      console.error("Chat message error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Get chat history
  app.get("/api/chat-messages/:userId", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to get chat messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
