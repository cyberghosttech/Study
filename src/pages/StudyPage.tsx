import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Bookmark, BookmarkCheck, ArrowLeft, ArrowRight, Bot, Brain } from 'lucide-react';
import {
  getSubjectById, getChapterById, getTopicById, getTopicsByChapter, getLessonByTopic
} from '../data/mock-data';
import { useAppState } from '../context/AppContext';

export default function StudyPage() {
  const { subject: subjectId, chapter: chapterId, topic: topicId } = useParams();
  const { markTopicComplete, toggleBookmark, topics } = useAppState();

  const subject = getSubjectById(subjectId ?? '');
  const chapter = getChapterById(chapterId ?? '');
  const topic = getTopicById(topicId ?? '');
  const lesson = getLessonByTopic(topicId ?? '');
  const chapterTopics = getTopicsByChapter(chapterId ?? '');
  const currentTopicState = topics.find(t => t.id === topicId);

  if (!subject || !chapter || !topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="text-center py-12">
          <p className="text-text-muted">Topic not found.</p>
          <Link to={`/subjects/${subjectId}`} className="text-primary text-sm mt-2 inline-block hover:underline">
            Back to {subject?.name ?? 'subject'}
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = chapterTopics.findIndex(t => t.id === topicId);
  const prevTopic = currentIndex > 0 ? chapterTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < chapterTopics.length - 1 ? chapterTopics[currentIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6" aria-label="Breadcrumb">
        <Link to="/subjects" className="hover:text-primary">Subjects</Link>
        <span>/</span>
        <Link to={`/subjects/${subject.id}`} className="hover:text-primary">{subject.name}</Link>
        <span>/</span>
        <span className="text-text-secondary">{chapter.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Topic Navigation Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <div className="bg-surface rounded-xl border border-border p-4 sticky top-20">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">Topics</h3>
            <nav className="space-y-1">
              {chapterTopics.map((t, i) => (
                <Link
                  key={t.id}
                  to={`/study/${subject.id}/${chapter.id}/${t.id}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    t.id === topicId
                      ? 'bg-primary-light text-primary font-medium'
                      : 'text-text-secondary hover:bg-border-light'
                  }`}
                >
                  {t.completed || currentTopicState?.completed ? (
                    <Check size={14} className="text-success shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-border shrink-0" />
                  )}
                  <span className="truncate">{t.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Lesson Content */}
        <div className="flex-1 min-w-0">
          <article className="bg-surface rounded-xl border border-border p-6 lg:p-8 shadow-sm">
            {/* Lesson Header */}
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-text-muted mb-1">
                Chapter {String(chapter.order).padStart(2, '0')} / {chapter.name}
              </p>
              <h1 className="text-2xl font-bold text-text-primary">{lesson?.title ?? topic.name}</h1>
              {lesson && (
                <p className="text-sm text-text-muted mt-2">~{lesson.estimatedMinutes} min read</p>
              )}
            </div>

            {/* Lesson Content */}
            {lesson ? (
              <div className="prose-study space-y-5">
                {lesson.content.map((section, i) => {
                  switch (section.type) {
                    case 'heading':
                      return <h2 key={i} className="text-lg font-semibold text-text-primary mt-6">{section.content}</h2>;
                    case 'text':
                      return <p key={i} className="text-text-secondary leading-relaxed">{section.content}</p>;
                    case 'key-concept':
                      return (
                        <div key={i} className="bg-primary-light border border-primary/20 rounded-lg p-4">
                          <p className="text-sm font-semibold text-primary mb-1">Key Concept</p>
                          <p className="text-text-secondary text-sm leading-relaxed">{section.content}</p>
                        </div>
                      );
                    case 'example':
                      return (
                        <div key={i} className="bg-border-light rounded-lg p-4">
                          <p className="text-sm font-semibold text-text-secondary mb-2">Example</p>
                          <pre className="text-sm text-text-primary whitespace-pre-wrap font-mono leading-relaxed">{section.content}</pre>
                        </div>
                      );
                    case 'note':
                      return (
                        <div key={i} className="bg-warning-light border border-warning/20 rounded-lg p-4">
                          <p className="text-sm font-semibold text-warning mb-1">Note</p>
                          <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                        </div>
                      );
                    default:
                      return <p key={i} className="text-text-secondary">{section.content}</p>;
                  }
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-text-muted">Lesson content coming soon.</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-border">
              <Link
                to={`/ai-tutor?topic=${topicId}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                <Bot size={16} />
                Ask AI Tutor
              </Link>
              <Link
                to={`/practice?topic=${topicId}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-border-light text-text-secondary rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                <Brain size={16} />
                Practice
              </Link>
              <button
                onClick={() => toggleBookmark(topic.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTopicState?.bookmarked
                    ? 'bg-warning-light text-warning'
                    : 'bg-border-light text-text-secondary hover:bg-border'
                }`}
              >
                {currentTopicState?.bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                {currentTopicState?.bookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              {!currentTopicState?.completed && (
                <button
                  onClick={() => markTopicComplete(topic.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-success-light text-success rounded-lg text-sm font-medium hover:bg-success/10 transition-colors ml-auto"
                >
                  <Check size={16} />
                  Mark Complete
                </button>
              )}
            </div>
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            {prevTopic ? (
              <Link
                to={`/study/${subject.id}/${chapter.id}/${prevTopic.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <ArrowLeft size={16} />
                {prevTopic.name}
              </Link>
            ) : <div />}
            {nextTopic ? (
              <Link
                to={`/study/${subject.id}/${chapter.id}/${nextTopic.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {nextTopic.name}
                <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
