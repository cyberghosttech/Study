import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Subject, Chapter, Topic, Activity, WeakTopic, StudyPlan, User } from '../types';
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
  toggleDarkMode: () => void;
  markTopicComplete: (topicId: string) => void;
  toggleBookmark: (topicId: string) => void;
  addActivity: (activity: Activity) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(mockUser);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [chapters, setChapters] = useState<Chapter[]>(mockChapters);
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [weakTopics] = useState<WeakTopic[]>(mockWeakTopics);
  const [studyPlan] = useState<StudyPlan>(mockStudyPlan);
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <AppContext.Provider value={{
      user, subjects, chapters, topics, activities, weakTopics, studyPlan,
      darkMode, toggleDarkMode, markTopicComplete, toggleBookmark, addActivity
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
