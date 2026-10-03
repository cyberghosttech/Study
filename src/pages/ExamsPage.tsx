import React, { useState, useEffect, useCallback } from 'react';
import { Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockExamConfigs, mockQuestions, getSubjectById } from '../data/mock-data';
import type { ExamConfig, Question } from '../types';

type ExamState = 'list' | 'running' | 'results';

export default function ExamsPage() {
  const [state, setState] = useState<ExamState>('list');
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);

  const startExam = (config: ExamConfig) => {
    const qs = config.questions.map(id => mockQuestions.find(q => q.id === id)).filter(Boolean) as Question[];
    // Duplicate questions to reach total count if needed
    const fullQs = qs.length > 0 ? Array.from({ length: Math.min(config.totalQuestions, qs.length * 3) }, (_, i) => qs[i % qs.length]) : [];
    setExamQuestions(fullQs);
    setActiveExam(config);
    setTimeLeft(config.duration * 60);
    setAnswers({});
    setCurrentQ(0);
    setState('running');
  };

  useEffect(() => {
    if (state !== 'running') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setState('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const submitExam = useCallback(() => {
    setState('results');
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (state === 'list') {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Examinations</h1>
          <p className="text-text-secondary mt-1">Practice with mock exams and past papers</p>
        </div>

        <div className="space-y-4">
          {mockExamConfigs.map(config => {
            const subject = getSubjectById(config.subjectId);
            return (
              <div key={config.id} className="bg-surface rounded-xl border border-border p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-border-light">
                      <FileText size={24} className="text-text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{config.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {config.duration} min
                        </span>
                        <span>{config.totalQuestions} questions</span>
                        <span>{config.totalMarks} marks</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => startExam(config)}
                    className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors self-start sm:self-auto"
                  >
                    Start Exam
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (state === 'results' && activeExam) {
    const correct = examQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
    const incorrect = examQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer).length;
    const skipped = examQuestions.filter(q => answers[q.id] === undefined).length;
    const score = correct;

    return (
      <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Exam Complete</h2>
          <p className="text-text-muted mb-4">{activeExam.title}</p>
          <div className="text-5xl font-bold text-primary my-4">{score} / {examQuestions.length}</div>

          <div className="flex items-center justify-center gap-6 text-sm mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              <span className="text-text-secondary">{correct} Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle size={16} className="text-danger" />
              <span className="text-text-secondary">{incorrect} Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-text-muted" />
              <span className="text-text-secondary">{skipped} Skipped</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setState('list')}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Back to Exams
        </button>
      </div>
    );
  }

  // Running exam
  const question = examQuestions[currentQ];
  if (!question || !activeExam) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Exam Header */}
      <div className="bg-surface rounded-xl border border-border p-4 mb-6 flex items-center justify-between sticky top-16 z-30">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">{activeExam.title}</h2>
          <p className="text-xs text-text-muted">Question {currentQ + 1} of {examQuestions.length}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-border-light rounded-lg">
          <Clock size={14} className="text-text-secondary" />
          <span className={`text-sm font-mono font-medium ${timeLeft < 300 ? 'text-danger' : 'text-text-primary'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-4">
        <h3 className="text-lg font-medium text-text-primary mb-6">{question.question}</h3>
        {question.options && (
          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setAnswers(prev => ({ ...prev, [question.id]: i }))}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  answers[question.id] === i
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                    answers[question.id] === i ? 'border-primary bg-primary text-white' : 'border-border text-text-muted'
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

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQ(i => Math.max(0, i - 1))}
          disabled={currentQ === 0}
          className="px-4 py-2 text-sm font-medium text-text-secondary disabled:opacity-40"
        >
          Previous
        </button>
        {currentQ === examQuestions.length - 1 ? (
          <button onClick={submitExam} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">
            Submit Exam
          </button>
        ) : (
          <button onClick={() => setCurrentQ(i => i + 1)} className="px-4 py-2 text-sm font-medium text-text-secondary">
            Next
          </button>
        )}
      </div>
    </div>
  );
}
