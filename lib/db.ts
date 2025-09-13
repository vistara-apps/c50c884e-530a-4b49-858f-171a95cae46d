import { User, Session, EducationalModule, RiskAssessment, UserProgress } from './types';

// Simple in-memory database for MVP
// In production, this would be replaced with a real database like PostgreSQL or MongoDB

class Database {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private riskAssessments: Map<string, RiskAssessment> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();

  // User operations
  async createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.userId, user);
    return user;
  }

  async getUser(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(userId);
    if (!user) return null;

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Session operations
  async createSession(sessionData: Omit<Session, 'sessionId'>): Promise<Session> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: Session = {
      ...sessionData,
      sessionId,
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  async getSession(sessionId: string): Promise<Session | null> {
    return this.sessions.get(sessionId) || null;
  }

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<Session | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const updatedSession = { ...session, ...updates };
    this.sessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async getUserSessions(userId: string): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(session => session.userId === userId);
  }

  // Risk Assessment operations
  async saveRiskAssessment(assessment: RiskAssessment): Promise<RiskAssessment> {
    this.riskAssessments.set(assessment.userId, assessment);
    return assessment;
  }

  async getRiskAssessment(userId: string): Promise<RiskAssessment | null> {
    return this.riskAssessments.get(userId) || null;
  }

  // User Progress operations
  async getUserProgress(userId: string): Promise<UserProgress | null> {
    return this.userProgress.get(userId) || null;
  }

  async updateUserProgress(userId: string, progress: Partial<UserProgress>): Promise<UserProgress> {
    const existing = this.userProgress.get(userId) || {
      userId,
      completedModules: [],
      totalTimeSpent: 0,
      achievementsBadges: [],
      lastActivity: new Date(),
    };

    const updated = {
      ...existing,
      ...progress,
      lastActivity: new Date(),
    };

    this.userProgress.set(userId, updated);
    return updated;
  }

  // Utility methods
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getAllSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values());
  }

  // Initialize with some sample data
  async initializeSampleData() {
    // Sample user
    await this.createUser({
      userId: 'sample_user_1',
      farcasterId: 'sample_farcaster',
      onboardingProgress: 25,
      riskToleranceScore: 65,
      purchasedFeatures: ['basic_chat'],
    });

    // Sample user progress
    await this.updateUserProgress('sample_user_1', {
      completedModules: ['crypto-basics', 'blockchain-explained'],
      totalTimeSpent: 45,
      achievementsBadges: ['first_module_completed'],
    });
  }
}

// Export singleton instance
export const db = new Database();

// Initialize sample data in development
if (process.env.NODE_ENV === 'development') {
  db.initializeSampleData();
}

