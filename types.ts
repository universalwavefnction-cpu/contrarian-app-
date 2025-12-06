export enum Category {
  Biohacking = 'Biohacking',
  Wellness = 'Wellness',
  Coding = 'Coding',
  Business = 'Business',
  Philosophy = 'Philosophy',
  Science = 'Science',
  Fitness = 'Fitness',
  Nutrition = 'Nutrition',
  Productivity = 'Productivity',
  AI = 'AI Use',
  Money = 'Money'
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Extreme = 'Extreme'
}

export interface Protocol {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  durationDays: number;
  participantCount: number;
  successRate: number;
  tags: string[];
  author: string;
  verified: boolean;
  steps?: string[];
}

export interface Experiment {
  id: string;
  protocolId: string;
  protocolTitle: string;
  startDate: string;
  day: number;
  totalDays: number;
  status: 'Active' | 'Completed' | 'Failed';
  moodLogs: { date: string; score: number }[];
  category: Category;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  level: number;
  location: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: Category;
  imageUrl: string;
  tags: string[];
}