import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getSubjectById, getChaptersBySubject } from '../data/mock-data';

export default function SubjectDetailPage() {
  const { subject: subjectId } = useParams<{ subject: string }>();
  const subject = getSubjectById(subjectId ?? '');
  const chapters = getChaptersBySubject(subjectId ?? '');

  if (!subject) {
    return (
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="text-center py-12">
          <p className="text-text-muted">Subject not found.</p>
          <Link to="/subjects" className="text-primary text-sm mt-2 inline-block hover:underline">
            Back to subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{subject.icon}</span>
          <h1 className="text-2xl font-bold text-text-primary">{subject.name}</h1>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1 max-w-xs h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
            />
          </div>
          <span className="text-sm font-medium text-text-secondary">{subject.progress}%</span>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-3">
        {chapters.map(chapter => (
          <Link
            key={chapter.id}
            to={`/study/${subject.id}/${chapter.id}/${chapter.id}-t${chapter.completedTopics < chapter.totalTopics ? chapter.completedTopics + 1 : chapter.totalTopics}`}
            className="block bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-border-light flex items-center justify-center text-sm font-bold text-text-secondary">
                  {String(chapter.order).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{chapter.name}</h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    {chapter.completedTopics}/{chapter.totalTopics} topics completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block w-24 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${chapter.progress}%`, backgroundColor: subject.color }}
                  />
                </div>
                <span className="text-sm text-text-muted hidden sm:block">{chapter.progress}%</span>
                <ArrowRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
