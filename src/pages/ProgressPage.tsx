import React from 'react';
import { BarChart3, Clock, Target, TrendingUp, BookOpen } from 'lucide-react';
import { useAppState } from '../context/AppContext';

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
          <h3 className="font-semibold text-text-primary mb-4">Topics Needing Attention</h3>
          <div className="space-y-3">
            {weakTopics.slice(0, 4).map(topic => (
              <div key={topic.topicId} className="flex items-center justify-between p-3 rounded-lg bg-danger-light/50">
                <div>
                  <p className="text-sm font-medium text-text-primary">{topic.topicName}</p>
                  <p className="text-xs text-text-muted">{topic.subjectName}</p>
                </div>
                <span className="text-sm font-medium text-danger">{topic.score}%</span>
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
