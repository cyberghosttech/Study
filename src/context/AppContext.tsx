import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Subject, Chapter, Topic, Activity, WeakTopic, StudyPlan, User, UserSubject, StudyDocument } from '../types';
import {
  mockUser, mockSubjects, mockActivities, mockWeakTopics, mockStudyPlan,
  mockChapters, mockTopics
} from '../data/mock-data';

// ============================================================
// App State Context
// Centralized state management for the application
// ============================================================

interface AppState {
  user: User;
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  activities: Activity[];
  weakTopics: WeakTopic[];
  studyPlan: StudyPlan;
  darkMode: boolean;
  // User-created content
  userSubjects: UserSubject[];
  documents: StudyDocument[];
  // Actions
  toggleDarkMode: () => void;
  markTopicComplete: (topicId: string) => void;
  toggleBookmark: (topicId: string) => void;
  addActivity: (activity: Activity) => void;
  // User subject actions
  addUserSubject: (subject: Omit<UserSubject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUserSubject: (id: string, updates: Partial<UserSubject>) => void;
  deleteUserSubject: (id: string) => void;
  // Document actions
  addDocument: (doc: Omit<StudyDocument, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, updates: Partial<StudyDocument>) => void;
  deleteDocument: (id: string) => void;
  getDocumentsBySubject: (subjectId: string) => StudyDocument[];
}

const AppContext = createContext<AppState | null>(null);

// Helper functions for localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(mockUser);
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [chapters, setChapters] = useState<Chapter[]>(mockChapters);
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [weakTopics] = useState<WeakTopic[]>(mockWeakTopics);
  const [studyPlan] = useState<StudyPlan>(mockStudyPlan);
  const [darkMode, setDarkMode] = useState(false);

  // User-created content with localStorage persistence
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>(() =>
    loadFromStorage('studyos_user_subjects', [])
  );
  const [documents, setDocuments] = useState<StudyDocument[]>(() =>
    loadFromStorage('studyos_documents', [])
  );

  // Persist to localStorage when changed
  useEffect(() => {
    saveToStorage('studyos_user_subjects', userSubjects);
  }, [userSubjects]);

  useEffect(() => {
    saveToStorage('studyos_documents', documents);
  }, [documents]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  const markTopicComplete = useCallback((topicId: string) => {
    setTopics(prev => prev.map(t => t.id === topicId ? { ...t, completed: true } : t));
    // Update chapter progress
    setChapters(prev => prev.map(ch => {
      const chapterTopics = topics.filter(t => t.chapterId === ch.id);
      const completedCount = chapterTopics.filter(t => t.completed || t.id === topicId).length;
      return { ...ch, completedTopics: completedCount, progress: Math.round((completedCount / ch.totalTopics) * 100) };
    }));
  }, [topics]);

  const toggleBookmark = useCallback((topicId: string) => {
    setTopics(prev => prev.map(t => t.id === topicId ? { ...t, bookmarked: !t.bookmarked } : t));
  }, []);

  const addActivity = useCallback((activity: Activity) => {
    setActivities(prev => [activity, ...prev]);
  }, []);

  // User Subject Actions
  const addUserSubject = useCallback((subject: Omit<UserSubject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newSubject: UserSubject = {
      ...subject,
      id: `user-subject-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setUserSubjects(prev => [...prev, newSubject]);
  }, []);

  const updateUserSubject = useCallback((id: string, updates: Partial<UserSubject>) => {
    setUserSubjects(prev => prev.map(s =>
      s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    ));
  }, []);

  const deleteUserSubject = useCallback((id: string) => {
    setUserSubjects(prev => prev.filter(s => s.id !== id));
    // Also delete associated documents
    setDocuments(prev => prev.filter(d => d.subjectId !== id));
  }, []);

  // Document Actions
  const addDocument = useCallback((doc: Omit<StudyDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newDoc: StudyDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setDocuments(prev => [...prev, newDoc]);
  }, []);

  const updateDocument = useCallback((id: string, updates: Partial<StudyDocument>) => {
    setDocuments(prev => prev.map(d =>
      d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
    ));
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  }, []);

  const getDocumentsBySubject = useCallback((subjectId: string) => {
    return documents.filter(d => d.subjectId === subjectId);
  }, [documents]);

  return (
    <AppContext.Provider value={{
      user, subjects, chapters, topics, activities, weakTopics, studyPlan,
      darkMode, userSubjects, documents,
      toggleDarkMode, markTopicComplete, toggleBookmark, addActivity,
      addUserSubject, updateUserSubject, deleteUserSubject,
      addDocument, updateDocument, deleteDocument, getDocumentsBySubject
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
}
