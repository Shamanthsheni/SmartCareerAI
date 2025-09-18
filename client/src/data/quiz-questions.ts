export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'text' | 'scale';
  options?: string[];
  description?: string;
  category: 'personality' | 'interests' | 'skills' | 'values' | 'work_style';
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What type of work environment do you thrive in?",
    type: "multiple_choice",
    description: "Think about where you feel most productive and comfortable. Your answer helps our AI understand your work style preferences.",
    options: [
      "Collaborative Team Environment - Working closely with others, brainstorming, and team projects",
      "Independent Work Setting - Self-directed work with minimal supervision and distractions", 
      "Mixed Environment - Balance of independent work and team collaboration",
      "Client-facing Environment - Regular interaction with customers or clients"
    ],
    category: "work_style"
  },
  {
    id: "q2", 
    question: "Which subjects did you enjoy most in school?",
    type: "multiple_choice",
    options: [
      "Mathematics and Physics - Numbers, equations, and scientific concepts",
      "Languages and Literature - Reading, writing, and communication",
      "Science and Biology - Understanding how things work in nature",
      "History and Social Studies - Learning about people, cultures, and societies",
      "Arts and Creative Subjects - Drawing, music, or creative expression"
    ],
    category: "interests"
  },
  {
    id: "q3",
    question: "Describe a project or achievement you're most proud of",
    type: "text",
    description: "Tell us about something you accomplished that made you feel proud. It could be academic, personal, or extracurricular.",
    category: "personality"
  },
  {
    id: "q4",
    question: "How important is job security versus creative freedom to you?",
    type: "scale",
    description: "Rate on a scale where 1 means job security is most important, and 10 means creative freedom is most important.",
    category: "values"
  },
  {
    id: "q5",
    question: "What motivates you most in your daily activities?",
    type: "multiple_choice",
    options: [
      "Solving complex problems and finding solutions",
      "Helping others and making a positive impact",
      "Creating something new and innovative", 
      "Leading and organizing people and projects",
      "Learning and gaining knowledge continuously"
    ],
    category: "personality"
  },
  {
    id: "q6",
    question: "Which of these career aspects matters most to you?",
    type: "multiple_choice",
    options: [
      "High salary and financial stability",
      "Work-life balance and flexible hours",
      "Opportunities for growth and advancement",
      "Making a difference in society",
      "Recognition and prestige"
    ],
    category: "values"
  },
  {
    id: "q7",
    question: "How do you prefer to learn new things?",
    type: "multiple_choice", 
    options: [
      "Hands-on practice and experimentation",
      "Reading books and detailed documentation",
      "Watching videos and visual demonstrations",
      "Discussion and learning from others",
      "Trial and error with immediate feedback"
    ],
    category: "skills"
  },
  {
    id: "q8",
    question: "What's your approach to handling stress or pressure?",
    type: "text",
    description: "Describe how you typically handle stressful situations or tight deadlines.",
    category: "personality"
  },
  {
    id: "q9",
    question: "Which activities do you enjoy in your free time?",
    type: "multiple_choice",
    options: [
      "Reading, writing, or intellectual pursuits",
      "Sports, fitness, or physical activities", 
      "Arts, crafts, or creative projects",
      "Social activities and spending time with friends",
      "Technology, gaming, or digital exploration"
    ],
    category: "interests"
  },
  {
    id: "q10",
    question: "How comfortable are you with public speaking or presentations?",
    type: "scale",
    description: "Rate your comfort level from 1 (very uncomfortable) to 10 (very comfortable).",
    category: "skills"
  },
  {
    id: "q11",
    question: "What role do you usually take in group projects?",
    type: "multiple_choice",
    options: [
      "The Leader - I organize and delegate tasks",
      "The Researcher - I gather and analyze information", 
      "The Creative - I come up with innovative ideas",
      "The Executor - I focus on completing tasks efficiently",
      "The Mediator - I help resolve conflicts and maintain harmony"
    ],
    category: "work_style"
  },
  {
    id: "q12", 
    question: "What's your ideal work schedule?",
    type: "multiple_choice",
    options: [
      "Traditional 9-5 weekdays with weekends off",
      "Flexible hours as long as work gets done",
      "Irregular schedule with variety and change",
      "Part-time or reduced hours for work-life balance",
      "Intensive periods followed by longer breaks"
    ],
    category: "work_style"
  },
  {
    id: "q13",
    question: "Describe your biggest strength and how you've used it",
    type: "text", 
    description: "What would others say is your greatest strength? Share an example of how this strength has helped you.",
    category: "personality"
  },
  {
    id: "q14",
    question: "How important is it for you to see immediate results from your work?",
    type: "scale",
    description: "Rate from 1 (I'm patient with long-term projects) to 10 (I need to see quick results).",
    category: "work_style"
  },
  {
    id: "q15",
    question: "What type of problems do you enjoy solving most?",
    type: "multiple_choice",
    options: [
      "Technical or mathematical problems with clear solutions",
      "People-related issues that require empathy and communication",
      "Creative challenges that need innovative thinking",
      "Strategic problems that require planning and analysis", 
      "Practical problems that improve daily life"
    ],
    category: "interests"
  },
  {
    id: "q16",
    question: "Which work environment energizes you most?",
    type: "multiple_choice",
    options: [
      "Fast-paced, dynamic environment with constant change",
      "Calm, organized environment with predictable routines",
      "Intellectual environment focused on learning and research",
      "Social environment with lots of human interaction",
      "Creative environment that encourages experimentation"
    ],
    category: "work_style"
  },
  {
    id: "q17",
    question: "What aspects of technology interest you most?",
    type: "multiple_choice",
    options: [
      "Programming and software development",
      "Understanding how devices and systems work",
      "Using technology to solve social problems",
      "The business and economic impact of technology",
      "I'm not particularly interested in technology"
    ],
    category: "interests"
  },
  {
    id: "q18",
    question: "How do you handle criticism or feedback?",
    type: "text",
    description: "Describe how you typically respond when someone gives you constructive feedback or criticism.",
    category: "personality"
  },
  {
    id: "q19",
    question: "What size organization would you prefer to work for?",
    type: "multiple_choice",
    options: [
      "Large corporation with established systems and benefits",
      "Medium-sized company with growth opportunities", 
      "Small startup with flexibility and innovation",
      "Non-profit organization focused on social impact",
      "Government organization serving the public"
    ],
    category: "values"
  },
  {
    id: "q20",
    question: "Looking ahead 10 years, what would make you feel most successful?",
    type: "text",
    description: "Describe what success looks like to you in the long term. What would you want to have achieved?",
    category: "values"
  }
];
