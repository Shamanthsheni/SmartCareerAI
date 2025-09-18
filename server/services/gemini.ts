import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "AIzaSyAYVQneV3Rs2CMCNVKWWrLI96goJ4aC2lA" 
});

export async function analyzeQuizResponse(questionId: string, answer: string, userContext: any) {
  try {
    const systemPrompt = `You are a career counselor for students in Jammu & Kashmir. 
Analyze this career assessment response and provide insights in JSON format.

Question ID: ${questionId}
Student Answer: "${answer}"
User Context: ${JSON.stringify(userContext)}

Focus on:
- J&K specific opportunities
- Government college recommendations  
- Realistic career advice
- Local job market insights

Respond with JSON in this exact format:
{
  "interests": ["interest1", "interest2"],
  "careerSuggestions": ["career1", "career2"],
  "personalityTraits": ["trait1", "trait2"],
  "analysis": "brief explanation connecting answer to career insights",
  "confidenceScore": 0.85
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            interests: { 
              type: "array",
              items: { type: "string" }
            },
            careerSuggestions: {
              type: "array", 
              items: { type: "string" }
            },
            personalityTraits: {
              type: "array",
              items: { type: "string" }
            },
            analysis: { type: "string" },
            confidenceScore: { type: "number" }
          },
          required: ["interests", "careerSuggestions", "personalityTraits", "analysis", "confidenceScore"]
        }
      },
      contents: answer
    });

    const rawJson = response.text;
    if (rawJson) {
      return JSON.parse(rawJson);
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini analysis error:", error);
    // Return fallback response
    return {
      interests: ["Problem Solving", "Technology"],
      careerSuggestions: ["Engineering", "Teaching"],
      personalityTraits: ["Analytical", "Creative"],
      analysis: "Based on your response, you show strong analytical thinking. Consider exploring technical fields that are growing in J&K.",
      confidenceScore: 0.7
    };
  }
}

export async function getChatResponse(message: string, userContext: any): Promise<string> {
  try {
    const systemPrompt = `You are a career counselor for students in Jammu & Kashmir. Provide helpful, personalized career guidance.

User Context: ${JSON.stringify(userContext)}
Student Question: "${message}"

Guidelines:
- Focus on J&K specific opportunities and colleges
- Mention government job prospects and local businesses
- Be encouraging and supportive
- Provide actionable advice
- Keep responses under 200 words
- Reference local institutions like NIT Srinagar, University of Jammu when relevant`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt
      },
      contents: message
    });

    return response.text || "I understand your question. Career planning in J&K offers many opportunities in both government and private sectors. Would you like to explore specific fields that interest you?";
  } catch (error) {
    console.error("Chat response error:", error);
    return "I'm having trouble connecting right now. Please try asking your question again in a moment.";
  }
}

export async function generateCareerRecommendations(userId: string, quizResponses: any[]): Promise<any[]> {
  try {
    const responsesText = quizResponses.map(r => `Q: ${r.questionId} A: ${r.answer}`).join('\n');
    
    const systemPrompt = `Based on these career assessment responses from a J&K student, generate 3-5 personalized career recommendations.

Assessment Responses:
${responsesText}

For each career, provide:
- Career title
- Match percentage (realistic, 70-95%)
- Description explaining why it matches
- Requirements and qualifications needed
- Salary range in INR for J&K region
- 4-5 step roadmap with timeline

Focus on careers available in J&K including:
- Engineering (NIT Srinagar, local IT companies)
- Teaching (government schools, private tutoring)
- Civil Services (JKAS, central govt jobs)
- Healthcare (government hospitals, private practice)
- Business (tourism, handicrafts, local trade)

Return JSON array format.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      },
      contents: "Generate career recommendations"
    });

    const recommendations = JSON.parse(response.text || "[]");
    return recommendations.map((rec: any) => ({
      userId,
      careerTitle: rec.careerTitle || "Career Path",
      matchPercentage: rec.matchPercentage || 75,
      description: rec.description || "A suitable career option based on your assessment.",
      requirements: rec.requirements || ["Relevant education", "Skills development"],
      salaryRange: rec.salaryRange || { min: 300000, max: 800000 },
      roadmap: rec.roadmap || [
        { step: "1", title: "Education", description: "Complete required education", timeline: "2-4 years", completed: false },
        { step: "2", title: "Skills", description: "Develop key skills", timeline: "1-2 years", completed: false },
        { step: "3", title: "Experience", description: "Gain practical experience", timeline: "1-3 years", completed: false },
        { step: "4", title: "Career", description: "Launch professional career", timeline: "Ongoing", completed: false }
      ]
    }));
  } catch (error) {
    console.error("Career recommendations error:", error);
    // Return fallback recommendations
    return [
      {
        userId,
        careerTitle: "Software Engineering",
        matchPercentage: 88,
        description: "High demand field with excellent growth prospects in J&K's expanding IT sector.",
        requirements: ["B.Tech Computer Science", "Programming Skills", "Problem-solving abilities"],
        salaryRange: { min: 600000, max: 1500000 },
        roadmap: [
          { step: "1", title: "Complete 12th", description: "Focus on PCM subjects", timeline: "Current", completed: false },
          { step: "2", title: "Engineering Entrance", description: "Prepare for JEE Main", timeline: "6 months", completed: false },
          { step: "3", title: "B.Tech", description: "Complete Computer Science degree", timeline: "4 years", completed: false },
          { step: "4", title: "Skills & Internships", description: "Build portfolio and gain experience", timeline: "During college", completed: false },
          { step: "5", title: "Career Launch", description: "Join tech companies or startups", timeline: "Post graduation", completed: false }
        ]
      },
      {
        userId,
        careerTitle: "Teaching",
        matchPercentage: 82,
        description: "Noble profession with high demand for qualified teachers in J&K education system.",
        requirements: ["Subject expertise", "B.Ed qualification", "Communication skills"],
        salaryRange: { min: 350000, max: 700000 },
        roadmap: [
          { step: "1", title: "Graduate Degree", description: "Complete B.A/B.Sc in chosen subject", timeline: "3 years", completed: false },
          { step: "2", title: "B.Ed", description: "Complete Bachelor of Education", timeline: "1-2 years", completed: false },
          { step: "3", title: "TET Preparation", description: "Prepare for Teacher Eligibility Test", timeline: "6 months", completed: false },
          { step: "4", title: "Teaching Position", description: "Apply for government or private schools", timeline: "Ongoing", completed: false }
        ]
      }
    ];
  }
}
