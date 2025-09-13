export interface User {
  userId: string;
  farcasterId?: string;
  onboardingProgress: number;
  riskToleranceScore?: number;
  purchasedFeatures: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  topic: string;
  cost: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface EducationalModule {
  moduleId: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  category: 'basics' | 'wallet' | 'scams' | 'risk';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  isPremium: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  moduleId?: string;
}

export interface RiskAssessment {
  userId: string;
  answers: Record<string, any>;
  score: number;
  recommendations: string[];
  completedAt: Date;
}

export interface ScamExample {
  id: string;
  title: string;
  description: string;
  type: 'phishing' | 'ponzi' | 'fake_giveaway' | 'impersonation' | 'rug_pull';
  redFlags: string[];
  prevention: string[];
}

export interface UserProgress {
  userId: string;
  completedModules: string[];
  currentModule?: string;
  totalTimeSpent: number; // in minutes
  achievementsBadges: string[];
  lastActivity: Date;
}
