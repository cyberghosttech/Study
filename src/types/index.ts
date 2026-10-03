// ============================================================
// StudyOS Type Definitions
// Maps to future Supabase tables
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  class: string;
  board: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  currentChapterId: string;
  totalChapters: number;
  completedChapters: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export interface Topic {
  id: string;
  chapterId: string;
  subjectId: string;
  name: string;
  order: number;
  completed: boolean;
  bookmarked: boolean;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: LessonSection[];
  estimatedMinutes: number;
}

export interface LessonSection {
  type: 'text' | 'heading' | 'key-concept' | 'example' | 'note';
  content: string;
}

export interface Question {
  id: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  type: 'mcq' | 'short' | 'long';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  subjectId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  totalMarks: number;
  answers: QuizAnswer[];
  timeSpent: number;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number | null;
  isCorrect?: boolean;
  markedForReview: boolean;
}

export interface StudySession {
  id: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  date: string;
  startTime: string;
  duration: number;
  completed: boolean;
}

export interface Progress {
  id: string;
  userId: string;
  subjectId: string;
  topicId: string;
  completedAt: string;
  score?: number;
  timeSpent: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  topicId: string;
  subjectId: string;
  chapterId: string;
  createdAt: string;
  note?: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  date: string;
  sessions: StudySession[];
}

export interface Activity {
  id: string;
  type: 'lesson_completed' | 'quiz_completed' | 'bookmark_added' | 'study_session';
  title: string;
  description: string;
  subjectId: string;
  timestamp: string;
}

export interface WeakTopic {
  topicId: string;
  subjectId: string;
  subjectName: string;
  topicName: string;
  chapterName: string;
  score: number;
  recommendation: 'revision' | 'practice' | 'continue';
}

export interface ExamConfig {
  id: string;
  title: string;
  subjectId: string;
  duration: number; // minutes
  totalQuestions: number;
  totalMarks: number;
  questions: string[]; // question IDs
}

export interface ExamResult {
  examId: string;
  score: number;
  totalMarks: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeSpent: number;
  topicAnalysis: TopicAnalysis[];
}

export interface TopicAnalysis {
  topicName: string;
  correct: number;
  total: number;
  percentage: number;
}

// AI Types
export interface AIConversation {
  id: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  messages: AIMessage[];
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIContext {
  subject: string;
  chapter: string;
  topic: string;
  currentLesson?: string;
}

// Flashcards
export interface Flashcard {
  id: string;
  topicId: string;
  subjectId: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  nextReview?: string;
  timesCorrect: number;
  timesIncorrect: number;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  subjectId: string;
  topicId: string;
  cards: Flashcard[];
  masteredCount: number;
  learningCount: number;
}

// Gamification
export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  weeklyActivity: boolean[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  requirement: number;
  progress: number;
  category: 'streak' | 'practice' | 'mastery' | 'special';
}

export interface XPEntry {
  date: string;
  xp: number;
  reason: string;
}

// Mastery
export interface TopicMastery {
  topicId: string;
  topicName: string;
  subjectId: string;
  subjectName: string;
  mastery: number; // 0-100
  questionsAttempted: number;
  correctAnswers: number;
  lastStudied: string;
  trend: 'up' | 'down' | 'stable';
}

// Brain Games
export interface BrainGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'logic' | 'memory' | 'math' | 'pattern';
  difficulty: 'easy' | 'medium' | 'hard';
  highScore?: number;
  playsToday: number;
}

// User-Created Subjects
export interface UserSubject {
  id: string;
  name: string;
  icon: string; // emoji
  color: string; // hex color
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Study Documents
export type DocumentType = 'pdf' | 'notes' | 'book' | 'link' | 'image' | 'audio' | 'video';

export interface StudyDocument {
  id: string;
  subjectId: string;
  name: string;
  type: DocumentType;
  description?: string;
  // For file uploads (base64 for localStorage)
  fileData?: string;
  fileSize?: number;
  mimeType?: string;
  // For links
  url?: string;
  // For notes (text content)
  content?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

// Navigation
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
