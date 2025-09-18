import { z } from "zod";

// User Schema
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(['student', 'parent', 'admin']),
  profile: z.object({
    name: z.string(),
    class: z.string().optional(),
    district: z.string().optional(),
    interests: z.array(z.string()).default([]),
    avatar: z.string().optional()
  }),
  createdAt: z.date(),
});

export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Quiz Response Schema
export const quizResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  questionId: z.string(),
  answer: z.string(),
  aiAnalysis: z.object({
    interests: z.array(z.string()),
    careerSuggestions: z.array(z.string()),
    personalityTraits: z.array(z.string()),
    analysis: z.string(),
    confidenceScore: z.number()
  }).optional(),
  createdAt: z.date(),
});

export const insertQuizResponseSchema = quizResponseSchema.omit({ id: true, createdAt: true });
export type QuizResponse = z.infer<typeof quizResponseSchema>;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;

// Career Recommendation Schema
export const careerRecommendationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  careerTitle: z.string(),
  matchPercentage: z.number(),
  description: z.string(),
  requirements: z.array(z.string()),
  salaryRange: z.object({
    min: z.number(),
    max: z.number()
  }),
  roadmap: z.array(z.object({
    step: z.string(),
    title: z.string(),
    description: z.string(),
    timeline: z.string(),
    completed: z.boolean().default(false)
  })),
  createdAt: z.date(),
});

export const insertCareerRecommendationSchema = careerRecommendationSchema.omit({ id: true, createdAt: true });
export type CareerRecommendation = z.infer<typeof careerRecommendationSchema>;
export type InsertCareerRecommendation = z.infer<typeof insertCareerRecommendationSchema>;

// Chat Message Schema
export const chatMessageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  message: z.string(),
  response: z.string(),
  isFromAI: z.boolean(),
  createdAt: z.date(),
});

export const insertChatMessageSchema = chatMessageSchema.omit({ id: true, createdAt: true });
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

// College Schema
export const collegeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['Government', 'Private', 'Deemed University', 'Central University']),
  district: z.string(),
  location: z.object({
    coordinates: z.array(z.number()),
    address: z.string()
  }),
  courses: z.array(z.object({
    name: z.string(),
    duration: z.string(),
    annualFees: z.number(),
    seatsTotal: z.number(),
    seatsAvailable: z.number(),
    cutoffPercentage: z.number(),
    medium: z.string()
  })),
  facilities: z.array(z.string()),
  ratings: z.object({
    infrastructure: z.number(),
    faculty: z.number(),
    placement: z.number(),
    overall: z.number()
  }),
  placementStats: z.object({
    placementRate: z.number(),
    averagePackage: z.number(),
    topRecruiters: z.array(z.string())
  })
});

export type College = z.infer<typeof collegeSchema>;
