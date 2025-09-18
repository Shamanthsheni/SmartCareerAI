import { type User, type InsertUser, type QuizResponse, type InsertQuizResponse, type CareerRecommendation, type InsertCareerRecommendation, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

  // Quiz Responses
  getQuizResponses(userId: string): Promise<QuizResponse[]>;
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  
  // Career Recommendations
  getCareerRecommendations(userId: string): Promise<CareerRecommendation[]>;
  createCareerRecommendation(recommendation: InsertCareerRecommendation): Promise<CareerRecommendation>;
  
  // Chat Messages
  getChatMessages(userId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizResponses: Map<string, QuizResponse>;
  private careerRecommendations: Map<string, CareerRecommendation>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.quizResponses = new Map();
    this.careerRecommendations = new Map();
    this.chatMessages = new Map();
    
    // Initialize with demo user
    const demoUser: User = {
      id: "demo-user-1",
      username: "priya_sharma",
      email: "priya@example.com",
      role: "student",
      profile: {
        name: "Priya Sharma",
        class: "Class 12, Science Stream",
        district: "Srinagar",
        interests: ["Technology", "Mathematics", "Problem Solving"],
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face"
      },
      createdAt: new Date()
    };
    this.users.set(demoUser.id, demoUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getQuizResponses(userId: string): Promise<QuizResponse[]> {
    return Array.from(this.quizResponses.values()).filter(response => response.userId === userId);
  }

  async createQuizResponse(insertResponse: InsertQuizResponse): Promise<QuizResponse> {
    const id = randomUUID();
    const response: QuizResponse = { ...insertResponse, id, createdAt: new Date() };
    this.quizResponses.set(id, response);
    return response;
  }

  async getCareerRecommendations(userId: string): Promise<CareerRecommendation[]> {
    return Array.from(this.careerRecommendations.values()).filter(rec => rec.userId === userId);
  }

  async createCareerRecommendation(insertRecommendation: InsertCareerRecommendation): Promise<CareerRecommendation> {
    const id = randomUUID();
    const recommendation: CareerRecommendation = { ...insertRecommendation, id, createdAt: new Date() };
    this.careerRecommendations.set(id, recommendation);
    return recommendation;
  }

  async getChatMessages(userId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { ...insertMessage, id, createdAt: new Date() };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
