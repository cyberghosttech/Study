import React, { useState } from 'react';
import { Plus, Clock, Trash2 } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { getSubjectById, getTopicById } from '../data/mock-data';
import type { StudySession } from '../types';

export default function PlannerPage() {
  const { studyPlan, subjects } = useAppState();
  const [sessions, setSessions] = useState<StudySession[]>(studyPlan.sessions);
  const [showAdd, setShowAdd] = useState(false);
  const [newSession, setNewSession] = useState({ subjectId: '', topic: '', time: '', duration: 30 });

  const addSession = () => {
    if (!newSession.subjectId || !newSession.time) return;
    const session: StudySession = {
      id: `s-${Date.now()}`,
      subjectId: newSession.subjectId,
      chapterId: '',
      topicId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: newSession.time,
      duration: newSession.duration,
      completed: false,
    };
    setSessions(prev => [...prev, session].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    setShowAdd(false);
    setNewSession({ subjectId: '', topic: '', time: '', duration: 30 });
  };

  const removeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Study Planner</h1>
          <p className="text-text-secondary mt-1">{today}</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          <Plus size={16} />
          Add Session
        </button>
      </div>

      {/* Add Session Form */}
      {showAdd && (
        <div className="bg-surface rounded-xl border border-border p-5 shadow-sm mb-6">
          <h3 className="font-medium text-text-primary mb-4">New Study Session</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
              <select
                value={newSession.subjectId}
                onChange={e => setNewSession(prev => ({ ...prev, subjectId: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select subject</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Topic</label>
              <input
                type="text"
                value={newSession.topic}
                onChange={e => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                placeholder="What to study"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Start Time</label>
              <input
                type="time"
                value={newSession.time}
                onChange={e => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Duration (min)</label>
              <input
                type="number"
                value={newSession.duration}
                onChange={e => setNewSession(prev => ({ ...prev, duration: Number(e.target.value) }))}
                min={15}
                max={180}
                step={15}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={addSession}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Add Session
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-text-secondary text-sm font-medium hover:text-text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm">
          <p className="text-text-muted">No study sessions planned for today.</p>
          <p className="text-sm text-text-muted mt-1">Click "Add Session" to plan your study time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map(session => {
            const subject = getSubjectById(session.subjectId);
            return (
              <div key={session.id} className="bg-surface rounded-xl border border-border p-4 shadow-sm flex items-center gap-4">
                <div className="text-center min-w-[56px]">
                  <p className="text-sm font-bold text-text-primary">{session.startTime}</p>
                  <p className="text-xs text-text-muted">{session.duration}m</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{subject?.name ?? 'Unknown'}</p>
                  <p className="text-xs text-text-secondary">
                    {session.topicId ? getTopicById(session.topicId)?.name : 'Study session'}
                  </p>
                </div>
                {subject && <span className="text-xl">{subject.icon}</span>}
                <button
                  onClick={() => removeSession(session.id)}
                  className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger-light transition-colors"
                  aria-label="Remove session"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Weekly Overview */}
      <div className="mt-8 bg-surface rounded-xl border border-border p-6 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-4">This Week</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
            const isToday = i === new Date().getDay() - 1 || (i === 6 && new Date().getDay() === 0);
            const sessionCount = isToday ? sessions.length : Math.floor(Math.random() * 3);
            return (
              <div key={day} className={`text-center p-2 rounded-lg ${isToday ? 'bg-primary-light' : 'bg-border-light/50'}`}>
                <p className={`text-xs font-medium ${isToday ? 'text-primary' : 'text-text-muted'}`}>{day}</p>
                <p className={`text-lg font-bold mt-1 ${isToday ? 'text-primary' : 'text-text-secondary'}`}>
                  {sessionCount > 0 ? sessionCount : '—'}
                </p>
                <p className="text-[10px] text-text-muted">sessions</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
