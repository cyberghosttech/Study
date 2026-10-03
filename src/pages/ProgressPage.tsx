import React from 'react';
import { BarChart3, Clock, Target, TrendingUp, BookOpen, Flame, Trophy, Award } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { mockStreak, mockBadges, mockTopicMastery } from '../data/mock-data';

export default function ProgressPage() {
  const { subjects, weakTopics } = useAppState();

  const overallProgress = Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Progress</h1>
        <p className="text-text-secondary mt-1">Track your learning journey</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Overall" value={`${overallProgress}%`} icon={BarChart3} color="text-primary" />
        <StatCard label="Study Time" value="8h 42m" icon={Clock} color="text-success" />
        <StatCard label="Questions" value="428" icon={Target} color="text-warning" />
        <StatCard label="Accuracy" value="82%" icon={TrendingUp} color="text-primary" />
      </div>

      {/* Streak */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-warning" />
            <h3 className="font-semibold text-text-primary">Study Streak</h3>
          </div>
          <span className="text-2xl font-bold text-warning">{mockStreak.currentStreak} days</span>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div
              key={day}
              className={`text-center p-2 rounded-lg ${
                mockStreak.weeklyActivity[i] ? 'bg-warning-light' : 'bg-border-light/50'
              }`}
            >
              <p className={`text-xs font-medium ${mockStreak.weeklyActivity[i] ? 'text-warning' : 'text-text-muted'}`}>{day}</p>
              <p className={`text-lg font-bold mt-1 ${mockStreak.weeklyActivity[i] ? 'text-warning' : 'text-text-muted'}`}>
                {mockStreak.weeklyActivity[i] ? '🔥' : '—'}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-muted">Longest streak: {mockStreak.longestStreak} days</p>
      </div>

      {/* Badges */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-warning" />
          <h3 className="font-semibold text-text-primary">Badges & Achievements</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mockBadges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg text-center ${
                badge.earnedAt ? 'bg-warning-light/50 border border-warning/20' : 'bg-border-light/50 opacity-60'
              }`}
            >
              <span className="text-3xl mb-2 block">{badge.icon}</span>
              <p className="text-sm font-medium text-text-primary">{badge.name}</p>
              <p className="text-xs text-text-muted mt-1">{badge.description}</p>
              {!badge.earnedAt && (
                <div className="mt-2">
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: `${(badge.progress / badge.requirement) * 100}%` }} />
                  </div>
                  <p className="text-xs text-text-muted mt-1">{badge.progress}/{badge.requirement}</p>
                </div>
              )}
              {badge.earnedAt && (
                <p className="text-xs text-success mt-2 font-medium">✓ Earned</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-text-primary mb-3">Overall Progress</h3>
        <div className="h-3 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
        </div>
        <p className="text-sm text-text-muted mt-2">{overallProgress}% across all subjects</p>
      </div>

      {/* Subject Progress */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Subject Progress</h3>
        <div className="space-y-4">
          {subjects.map(subject => (
            <div key={subject.id} className="flex items-center gap-4">
              <span className="text-xl">{subject.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">{subject.name}</span>
                  <span className="text-sm text-text-muted">{subject.progress}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strong & Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4">Strong Topics</h3>
          <div className="space-y-3">
            {subjects.filter(s => s.progress >= 70).map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-success-light/50">
                <div className="flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span className="text-sm font-medium text-text-primary">{s.name}</span>
                </div>
                <span className="text-sm font-medium text-success">{s.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Knowledge Gaps</h3>
            <a href="#/mastery" className="text-sm text-primary font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {mockTopicMastery.filter(m => m.mastery < 60).slice(0, 4).map(topic => (
              <div key={topic.topicId} className="flex items-center gap-3 p-3 rounded-lg bg-danger-light/30">
                <div className="relative w-10 h-10 shrink-0">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                    <circle
                      cx="20" cy="20" r="16" fill="none"
                      stroke="currentColor" strokeWidth="3"
                      strokeDasharray={`${(topic.mastery / 100) * 100.5} 100.5`}
                      strokeLinecap="round"
                      className="text-danger"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-danger">
                    {topic.mastery}%
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{topic.topicName}</p>
                  <p className="text-xs text-text-muted">{topic.subjectName}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  topic.trend === 'down' ? 'bg-danger-light text-danger' :
                  topic.trend === 'up' ? 'bg-success-light text-success' :
                  'bg-border-light text-text-muted'
                }`}>
                  {topic.trend === 'down' ? '↓ Declining' : topic.trend === 'up' ? '↑ Improving' : '→ Stable'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-border-light ${color}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xl font-bold text-text-primary">{value}</p>
          <p className="text-xs text-text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}
