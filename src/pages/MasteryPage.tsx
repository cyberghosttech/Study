import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';
import { mockTopicMastery, mockSubjects } from '../data/mock-data';

export default function MasteryPage() {
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'mastery' | 'name'>('mastery');

  const filtered = mockTopicMastery
    .filter(m => filterSubject === 'all' || m.subjectId === filterSubject)
    .sort((a, b) => sortBy === 'mastery' ? a.mastery - b.mastery : a.topicName.localeCompare(b.topicName));

  const avgMastery = Math.round(mockTopicMastery.reduce((sum, m) => sum + m.mastery, 0) / mockTopicMastery.length);
  const highMastery = mockTopicMastery.filter(m => m.mastery >= 75).length;
  const needsWork = mockTopicMastery.filter(m => m.mastery < 50).length;

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-success';
    if (mastery >= 60) return 'text-primary';
    if (mastery >= 40) return 'text-warning';
    return 'text-danger';
  };

  const getMasteryBg = (mastery: number) => {
    if (mastery >= 80) return 'bg-success';
    if (mastery >= 60) return 'bg-primary';
    if (mastery >= 40) return 'bg-warning';
    return 'bg-danger';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="text-success" />;
      case 'down': return <TrendingDown size={14} className="text-danger" />;
      default: return <Minus size={14} className="text-text-muted" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Mastery</h1>
        <p className="text-text-secondary mt-1">Track your understanding of each topic</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-text-muted mb-1">Average Mastery</p>
          <p className="text-3xl font-bold text-primary">{avgMastery}%</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-text-muted mb-1">Topics Mastered</p>
          <p className="text-3xl font-bold text-success">{highMastery}</p>
          <p className="text-xs text-text-muted">75%+ mastery</p>
        </div>
        <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-text-muted mb-1">Needs Work</p>
          <p className="text-3xl font-bold text-danger">{needsWork}</p>
          <p className="text-xs text-text-muted">Below 50%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-text-muted" />
          <select
            value={filterSubject}
            onChange={e => setFilterSubject(e.target.value)}
            className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Subjects</option>
            {mockSubjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'mastery' | 'name')}
          className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="mastery">Sort by Mastery</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Mastery List */}
      <div className="space-y-3">
        {filtered.map(topic => (
          <div key={topic.topicId} className="bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              {/* Mastery Ring */}
              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
                  <circle
                    cx="28" cy="28" r="24" fill="none"
                    stroke="currentColor" strokeWidth="4"
                    strokeDasharray={`${(topic.mastery / 100) * 150.8} 150.8`}
                    strokeLinecap="round"
                    className={getMasteryColor(topic.mastery)}
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${getMasteryColor(topic.mastery)}`}>
                  {topic.mastery}%
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-text-primary truncate">{topic.topicName}</h3>
                  {getTrendIcon(topic.trend)}
                </div>
                <p className="text-sm text-text-muted">{topic.subjectName}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
                  <span>{topic.questionsAttempted} questions</span>
                  <span>{topic.correctAnswers} correct</span>
                  <span>
                    {Math.round((topic.correctAnswers / Math.max(topic.questionsAttempted, 1)) * 100)}% accuracy
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="hidden sm:block w-24">
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getMasteryBg(topic.mastery)}`}
                    style={{ width: `${topic.mastery}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">No topics found for this filter.</p>
        </div>
      )}
    </div>
  );
}
