import React, { useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Flag, CheckCircle, XCircle, Clock, Layers, Zap, Brain, Target, Shuffle } from 'lucide-react';
import { getQuestionsByTopic, getQuestionsBySubject, getQuestionsByChapter, getSubjectById } from '../data/mock-data';
import type { Question } from '../types';

type PracticeMode = 'select' | 'quiz' | 'results';

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic');
  const [mode, setMode] = useState<PracticeMode>('select');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());

  const startQuiz = (qs: Question[]) => {
    setQuestions(qs);
    setAnswers({});
    setMarkedForReview(new Set());
    setCurrentIndex(0);
    setMode('quiz');
  };

  const submitQuiz = () => {
    setMode('results');
  };

  const selectAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const toggleReview = (questionId: string) => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  if (mode === 'select') {
    return <PracticeSelect topicId={topicId} onStart={startQuiz} />;
  }

  if (mode === 'results') {
    return <QuizResults questions={questions} answers={answers} onRetry={() => setMode('select')} />;
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-text-muted mb-2">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            currentQuestion.difficulty === 'easy' ? 'bg-success-light text-success' :
            currentQuestion.difficulty === 'medium' ? 'bg-warning-light text-warning' :
            'bg-danger-light text-danger'
          }`}>
            {currentQuestion.difficulty}
          </span>
          <button
            onClick={() => toggleReview(currentQuestion.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              markedForReview.has(currentQuestion.id) ? 'bg-warning-light text-warning' : 'text-text-muted hover:bg-border-light'
            }`}
            aria-label="Mark for review"
          >
            <Flag size={16} />
          </button>
        </div>

        <h2 className="text-lg font-medium text-text-primary mb-6">{currentQuestion.question}</h2>

        {currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(currentQuestion.id, i)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  answers[currentQuestion.id] === i
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-border hover:border-primary/40 hover:bg-border-light'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium shrink-0 ${
                    answers[currentQuestion.id] === i
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-text-muted'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm">{option}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Question Navigation Dots */}
      <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(i)}
            className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
              i === currentIndex ? 'bg-primary text-white' :
              answers[q.id] !== undefined ? 'bg-success-light text-success border border-success/30' :
              markedForReview.has(q.id) ? 'bg-warning-light text-warning border border-warning/30' :
              'bg-border-light text-text-muted hover:bg-border'
            }`}
            aria-label={`Go to question ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            Next
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Practice Select
// ============================================================
function PracticeSelect({ topicId, onStart }: { topicId: string | null; onStart: (qs: Question[]) => void }) {
  const practiceModes = [
    { label: 'MCQs', description: 'Multiple choice questions', icon: '🎯', action: 'mcq' },
    { label: 'Short Questions', description: 'Brief answer questions', icon: '✏️', action: 'short' },
    { label: 'Long Questions', description: 'Detailed answer questions', icon: '📝', action: 'long' },
    { label: 'Mixed Practice', description: 'All question types', icon: '🔀', action: 'mixed' },
    { label: 'Weak Topics', description: 'Focus on areas to improve', icon: '💡', action: 'weak' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Practice</h1>
        <p className="text-text-secondary mt-1">What do you want to practice?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {practiceModes.map(mode => (
          <button
            key={mode.label}
            onClick={() => {
              const qs = topicId
                ? getQuestionsByTopic(topicId).filter(q => q.type === 'mcq')
                : getQuestionsBySubject('cs').filter(q => q.type === 'mcq');
              if (qs.length > 0) onStart(qs);
            }}
            className="bg-surface rounded-xl border border-border p-6 text-left shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <span className="text-3xl mb-3 block">{mode.icon}</span>
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">{mode.label}</h3>
            <p className="text-sm text-text-muted mt-1">{mode.description}</p>
          </button>
        ))}
      </div>

      {/* Special Practice Modes */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Special Modes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/flashcards"
            className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <Layers size={24} className="text-primary mb-2" />
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Flashcards</h3>
            <p className="text-xs text-text-muted mt-1">Flip cards to memorize key concepts</p>
          </Link>
          <Link
            to="/true-false"
            className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <Zap size={24} className="text-warning mb-2" />
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">True or False</h3>
            <p className="text-xs text-text-muted mt-1">Quick-fire concept verification</p>
          </Link>
          <Link
            to="/brain-games"
            className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <Brain size={24} className="text-success mb-2" />
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Brain Games</h3>
            <p className="text-xs text-text-muted mt-1">Fun puzzles for study breaks</p>
          </Link>
          <Link
            to="/mastery"
            className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <Target size={24} className="text-danger mb-2" />
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">Mastery Check</h3>
            <p className="text-xs text-text-muted mt-1">See your topic-level mastery</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Quiz Results
// ============================================================
function QuizResults({ questions, answers, onRetry }: { questions: Question[]; answers: Record<string, number | null>; onRetry: () => void }) {
  const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const incorrect = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer).length;
  const skipped = questions.filter(q => answers[q.id] === undefined).length;
  const percentage = Math.round((correct / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Quiz Complete!</h2>
        <div className="text-5xl font-bold text-primary my-4">{percentage}%</div>
        <p className="text-text-secondary mb-6">{correct} out of {questions.length} correct</p>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-success" />
            <span className="text-text-secondary">{correct} Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-danger" />
            <span className="text-text-secondary">{incorrect} Incorrect</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-text-muted" />
            <span className="text-text-secondary">{skipped} Skipped</span>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="space-y-3">
        <h3 className="font-semibold text-text-primary">Review Answers</h3>
        {questions.map((q, i) => {
          const isCorrect = answers[q.id] === q.correctAnswer;
          const wasAnswered = answers[q.id] !== undefined;
          return (
            <div key={q.id} className={`bg-surface rounded-lg border p-4 ${
              !wasAnswered ? 'border-border' : isCorrect ? 'border-success/30' : 'border-danger/30'
            }`}>
              <div className="flex items-start gap-3">
                <span className={`shrink-0 mt-0.5 ${isCorrect ? 'text-success' : wasAnswered ? 'text-danger' : 'text-text-muted'}`}>
                  {!wasAnswered ? <Clock size={16} /> : isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{q.question}</p>
                  {wasAnswered && !isCorrect && (
                    <p className="text-xs text-danger mt-1">
                      Your answer: {q.options?.[answers[q.id] as number]}
                    </p>
                  )}
                  <p className="text-xs text-success mt-1">
                    Correct: {q.options?.[q.correctAnswer as number]}
                  </p>
                  {q.explanation && (
                    <p className="text-xs text-text-muted mt-2">{q.explanation}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Try Again
        </button>
        <Link
          to="/practice"
          className="px-6 py-2.5 bg-border-light text-text-secondary rounded-lg text-sm font-medium hover:bg-border transition-colors"
        >
          Back to Practice
        </Link>
      </div>
    </div>
  );
}
