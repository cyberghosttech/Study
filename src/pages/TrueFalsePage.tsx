import React, { useState } from 'react';
import { Check, X, ArrowRight, RotateCw } from 'lucide-react';
import { mockTrueFalseQuestions } from '../data/mock-data';

type TFState = 'intro' | 'playing' | 'results';

export default function TrueFalsePage() {
  const [state, setState] = useState<TFState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(mockTrueFalseQuestions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = mockTrueFalseQuestions[currentIndex];
  const correctCount = answers.filter((a, i) => a === mockTrueFalseQuestions[i].answer).length;

  const handleAnswer = (answer: boolean) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < mockTrueFalseQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setState('results');
    }
  };

  const restart = () => {
    setState('intro');
    setCurrentIndex(0);
    setAnswers(new Array(mockTrueFalseQuestions.length).fill(null));
    setShowFeedback(false);
  };

  if (state === 'intro') {
    return (
      <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8 text-center">
        <div className="bg-surface rounded-xl border border-border p-8 shadow-sm">
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">True or False</h1>
          <p className="text-text-secondary mb-6">
            Quick-fire round! Determine if each statement is true or false.
          </p>
          <div className="space-y-3 text-sm text-text-muted mb-6">
            <p>• {mockTrueFalseQuestions.length} statements</p>
            <p>• Instant feedback after each answer</p>
            <p>• Explanations provided</p>
          </div>
          <button
            onClick={() => setState('playing')}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Start Challenge
          </button>
        </div>
      </div>
    );
  }

  if (state === 'results') {
    const percentage = Math.round((correctCount / mockTrueFalseQuestions.length) * 100);
    return (
      <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm mb-6">
          <div className="text-5xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Challenge Complete!</h2>
          <div className="text-4xl font-bold text-primary my-4">{percentage}%</div>
          <p className="text-text-secondary">
            {correctCount} out of {mockTrueFalseQuestions.length} correct
          </p>
        </div>

        {/* Review */}
        <div className="space-y-2 mb-6">
          {mockTrueFalseQuestions.map((q, i) => {
            const isCorrect = answers[i] === q.answer;
            return (
              <div key={q.id} className={`p-3 rounded-lg border text-sm ${
                isCorrect ? 'bg-success-light/50 border-success/20' : 'bg-danger-light/50 border-danger/20'
              }`}>
                <div className="flex items-start gap-2">
                  {isCorrect ? <Check size={14} className="text-success mt-0.5 shrink-0" /> : <X size={14} className="text-danger mt-0.5 shrink-0" />}
                  <div>
                    <p className="text-text-primary">{q.statement}</p>
                    <p className="text-xs text-text-muted mt-1">
                      Answer: <strong>{q.answer ? 'True' : 'False'}</strong> — {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={restart}
          className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isCorrect = answers[currentIndex] === currentQuestion.answer;

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-text-muted">
          {currentIndex + 1} / {mockTrueFalseQuestions.length}
        </span>
        <span className="text-sm text-text-muted">
          {correctCount} correct
        </span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / mockTrueFalseQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-6">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">True or False?</p>
        <p className="text-lg font-medium text-text-primary leading-relaxed">{currentQuestion.statement}</p>
      </div>

      {/* Answer Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleAnswer(true)}
          disabled={showFeedback}
          className={`p-5 rounded-xl border-2 font-semibold text-lg transition-all ${
            showFeedback && currentQuestion.answer === true
              ? 'border-success bg-success-light text-success'
              : showFeedback && answers[currentIndex] === true && !isCorrect
              ? 'border-danger bg-danger-light text-danger'
              : 'border-border hover:border-success hover:bg-success-light/50 text-text-primary'
          } disabled:cursor-default`}
        >
          <Check size={24} className="mx-auto mb-2" />
          True
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={showFeedback}
          className={`p-5 rounded-xl border-2 font-semibold text-lg transition-all ${
            showFeedback && currentQuestion.answer === false
              ? 'border-success bg-success-light text-success'
              : showFeedback && answers[currentIndex] === false && !isCorrect
              ? 'border-danger bg-danger-light text-danger'
              : 'border-border hover:border-danger hover:bg-danger-light/50 text-text-primary'
          } disabled:cursor-default`}
        >
          <X size={24} className="mx-auto mb-2" />
          False
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`rounded-lg p-4 mb-4 ${isCorrect ? 'bg-success-light border border-success/20' : 'bg-danger-light border border-danger/20'}`}>
          <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-success' : 'text-danger'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-sm text-text-secondary">{currentQuestion.explanation}</p>
        </div>
      )}

      {showFeedback && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          {currentIndex === mockTrueFalseQuestions.length - 1 ? 'See Results' : 'Next'}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
