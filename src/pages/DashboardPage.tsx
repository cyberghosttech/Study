import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Target, TrendingUp, BookOpen, Bookmark, Zap } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { getSubjectById, getChapterById, getTopicById } from '../data/mock-data';

// ============================================================
// Dashboard Page
// ============================================================
export default function DashboardPage() {
  const { user, subjects, activities, weakTopics, studyPlan } = useAppState();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">{getGreeting()}</h1>
        <p className="text-text-secondary mt-1">Ready to continue learning?</p>
      </div>

      {/* Continue Learning */}
      <ContinueLearningCard />

      {/* Today's Progress */}
      <TodaysProgress />

      {/* Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">My Subjects</h2>
          <Link to="/subjects" className="text-sm text-primary font-medium hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>

      {/* Recommendations & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecommendedRevision weakTopics={weakTopics} />
        <RecentActivity activities={activities} />
      </div>

      {/* Today's Plan */}
      <TodaysPlan sessions={studyPlan.sessions} />
    </div>
  );
}

// ============================================================
// Continue Learning Card
// ============================================================
function ContinueLearningCard() {
  const subject = getSubjectById('cs');
  const chapter = getChapterById('cs-ch3');
  const topic = getTopicById('cs-ch3-t4');

  if (!subject || !chapter || !topic) return null;

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-muted uppercase tracking-wide">Continue Learning</p>
          <h3 className="text-xl font-semibold text-text-primary">{subject.name}</h3>
          <p className="text-text-secondary">{chapter.name} — {topic.name}</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 max-w-xs h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${chapter.progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-text-secondary">{chapter.progress}%</span>
          </div>
        </div>
        <Link
          to={`/study/cs/cs-ch3/cs-ch3-t4`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-hover transition-colors self-start sm:self-auto"
        >
          Continue
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// Today's Progress
// ============================================================
function TodaysProgress() {
  const stats = [
    { label: 'Study Time', value: '2h 15m', icon: Clock, color: 'text-primary' },
    { label: 'Questions', value: '47', icon: Target, color: 'text-success' },
    { label: 'Accuracy', value: '82%', icon: TrendingUp, color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(stat => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-surface rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-border-light ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-sm text-text-muted">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Subject Card
// ============================================================
function SubjectCard({ subject }: { subject: any }) {
  const chapter = getChapterById(subject.currentChapterId);

  return (
    <Link
      to={`/subjects/${subject.id}`}
      className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl" role="img" aria-label={subject.name}>{subject.icon}</span>
        <span className="text-xs font-medium text-text-muted bg-border-light px-2 py-0.5 rounded-full">
          {subject.completedChapters}/{subject.totalChapters}
        </span>
      </div>
      <h3 className="font-semibold text-text-primary mb-1">{subject.name}</h3>
      <p className="text-sm text-text-secondary mb-3">{chapter?.name ?? 'Not started'}</p>
      <div className="space-y-2">
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">{subject.progress}% complete</span>
          <ArrowRight size={14} className="text-text-muted group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// Recommended Revision
// ============================================================
function RecommendedRevision({ weakTopics }: { weakTopics: any[] }) {
  const getRecommendationStyle = (rec: string) => {
    switch (rec) {
      case 'revision': return { bg: 'bg-danger-light', text: 'text-danger', label: 'Needs revision' };
      case 'practice': return { bg: 'bg-warning-light', text: 'text-warning', label: 'Practice recommended' };
      case 'continue': return { bg: 'bg-primary-light', text: 'text-primary', label: 'Continue next lesson' };
      default: return { bg: 'bg-border-light', text: 'text-text-muted', label: 'Review' };
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-warning" />
        <h3 className="font-semibold text-text-primary">Recommended for you</h3>
      </div>
      <div className="space-y-3">
        {weakTopics.slice(0, 4).map(topic => {
          const style = getRecommendationStyle(topic.recommendation);
          return (
            <Link
              key={topic.topicId}
              to={`/study/${topic.subjectId}/${topic.topicId.split('-').slice(0, 2).join('-')}/${topic.topicId}`}
              className="flex items-center justify-between p-3 rounded-lg bg-border-light/50 hover:bg-border-light transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{topic.subjectName}</p>
                <p className="text-xs text-text-secondary">{topic.topicName}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                {style.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Recent Activity
// ============================================================
function RecentActivity({ activities }: { activities: any[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'lesson_completed': return BookOpen;
      case 'quiz_completed': return Target;
      case 'bookmark_added': return Bookmark;
      default: return Clock;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
      <h3 className="font-semibold text-text-primary mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.slice(0, 5).map(activity => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-border-light text-text-secondary mt-0.5">
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{activity.title}</p>
                <p className="text-xs text-text-muted">{activity.description} · {formatTime(activity.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Today's Plan
// ============================================================
function TodaysPlan({ sessions }: { sessions: any[] }) {
  if (!sessions.length) {
    return (
      <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
        <h3 className="font-semibold text-text-primary mb-2">Today's Plan</h3>
        <p className="text-sm text-text-muted">No study sessions planned for today.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">Today's Plan</h3>
        <Link to="/planner" className="text-sm text-primary font-medium hover:underline">
          View planner
        </Link>
      </div>
      <div className="space-y-3">
        {sessions.map(session => {
          const subject = getSubjectById(session.subjectId);
          const topic = getTopicById(session.topicId);
          return (
            <div key={session.id} className="flex items-center gap-4 p-3 rounded-lg bg-border-light/50">
              <div className="text-center min-w-[50px]">
                <p className="text-sm font-bold text-text-primary">{session.startTime}</p>
                <p className="text-xs text-text-muted">{session.duration}m</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{subject?.name}</p>
                <p className="text-xs text-text-secondary">{topic?.name}</p>
              </div>
              {subject && (
                <span className="text-lg">{subject.icon}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
