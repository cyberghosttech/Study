import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import StudyPage from './pages/StudyPage';
import PracticePage from './pages/PracticePage';
import ExamsPage from './pages/ExamsPage';
import ProgressPage from './pages/ProgressPage';
import PlannerPage from './pages/PlannerPage';
import AITutorPage from './pages/AITutorPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subjects/:subject" element={<SubjectDetailPage />} />
            <Route path="/study/:subject/:chapter/:topic" element={<StudyPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/ai-tutor" element={<AITutorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </AppProvider>
  );
}
