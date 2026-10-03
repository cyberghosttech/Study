import React, { useState, useEffect } from 'react';
import { Trophy, RotateCw, ArrowLeft } from 'lucide-react';
import { mockBrainGames } from '../data/mock-data';
import type { BrainGame } from '../types';

type GameState = 'list' | 'playing' | 'results';

export default function BrainGamesPage() {
  const [gameState, setGameState] = useState<GameState>('list');
  const [activeGame, setActiveGame] = useState<BrainGame | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentProblem, setCurrentProblem] = useState(0);

  // Number sequence game data
  const sequences = [
    { sequence: [2, 4, 8, 16], answer: 32, options: [24, 32, 30, 28] },
    { sequence: [1, 1, 2, 3, 5], answer: 8, options: [6, 7, 8, 10] },
    { sequence: [3, 6, 12, 24], answer: 48, options: [36, 42, 48, 96] },
    { sequence: [1, 4, 9, 16], answer: 25, options: [20, 24, 25, 36] },
    { sequence: [2, 6, 12, 20], answer: 30, options: [28, 30, 32, 24] },
    { sequence: [1, 3, 7, 15], answer: 31, options: [23, 27, 31, 35] },
    { sequence: [5, 10, 20, 40], answer: 80, options: [60, 70, 80, 100] },
    { sequence: [1, 2, 4, 7, 11], answer: 16, options: [14, 15, 16, 17] },
  ];

  // Quick math game data
  const mathProblems = [
    { question: '15 × 12 = ?', answer: 180, options: [170, 180, 190, 165] },
    { question: '144 ÷ 12 = ?', answer: 12, options: [10, 11, 12, 14] },
    { question: '25² = ?', answer: 625, options: [525, 600, 625, 650] },
    { question: '√169 = ?', answer: 13, options: [11, 12, 13, 14] },
    { question: '7³ = ?', answer: 343, options: [243, 343, 443, 297] },
    { question: '45 × 8 = ?', answer: 360, options: [340, 350, 360, 380] },
    { question: '1000 - 387 = ?', answer: 613, options: [603, 613, 623, 597] },
    { question: '17 × 6 = ?', answer: 102, options: [96, 98, 102, 108] },
  ];

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = (game: BrainGame) => {
    setActiveGame(game);
    setScore(0);
    setTimeLeft(30);
    setCurrentProblem(0);
    setGameState('playing');
  };

  const handleAnswer = (selected: number) => {
    if (!activeGame) return;
    const problems = activeGame.category === 'math' ? mathProblems : sequences;
    const problem = problems[currentProblem % problems.length];
    
    if (selected === problem.answer) {
      setScore(prev => prev + 100 + timeLeft * 2);
    }
    
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  if (gameState === 'list') {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Brain Games</h1>
          <p className="text-text-secondary mt-1">Take a study break and keep your mind sharp</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBrainGames.map(game => (
            <button
              key={game.id}
              onClick={() => startGame(game)}
              className="bg-surface rounded-xl border border-border p-5 text-left shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{game.icon}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  game.difficulty === 'easy' ? 'bg-success-light text-success' :
                  game.difficulty === 'medium' ? 'bg-warning-light text-warning' :
                  'bg-danger-light text-danger'
                }`}>
                  {game.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">{game.name}</h3>
              <p className="text-sm text-text-muted mb-3">{game.description}</p>
              {game.highScore && (
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Trophy size={12} className="text-warning" />
                  Best: {game.highScore}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'results' && activeGame) {
    return (
      <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm">
          <div className="text-5xl mb-4">{score >= 500 ? '🏆' : score >= 300 ? '⭐' : '🎮'}</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Game Over!</h2>
          <p className="text-text-secondary mb-4">{activeGame.name}</p>
          <div className="text-4xl font-bold text-primary my-4">{score}</div>
          <p className="text-sm text-text-muted">points</p>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => startGame(activeGame)}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={() => setGameState('list')}
            className="flex-1 px-4 py-3 bg-border-light text-text-secondary rounded-lg text-sm font-medium hover:bg-border transition-colors"
          >
            All Games
          </button>
        </div>
      </div>
    );
  }

  if (!activeGame) return null;
  const isMath = activeGame.category === 'math';
  const problems = isMath ? mathProblems : sequences;
  const problem = problems[currentProblem % problems.length] as any;

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setGameState('list')} className="text-sm text-text-muted hover:text-primary">
          ← Exit
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-text-primary">Score: {score}</span>
          <span className={`text-sm font-mono font-bold px-3 py-1 rounded-lg ${
            timeLeft <= 10 ? 'bg-danger-light text-danger' : 'bg-border-light text-text-primary'
          }`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Problem */}
      <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm mb-6">
        <p className="text-xs text-text-muted uppercase tracking-wide mb-4">
          {activeGame.category === 'math' ? 'Quick Math' : 'Find the Pattern'}
        </p>
        {activeGame.category === 'math' ? (
          <p className="text-3xl font-bold text-text-primary">{problem.question}</p>
        ) : (
          <div>
            <p className="text-sm text-text-muted mb-2">What comes next?</p>
            <p className="text-2xl font-bold text-text-primary">
              {problem.sequence.join(', ')}, <span className="text-primary">?</span>
            </p>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {problem.options.map((option: number, i: number) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className="p-4 bg-surface border border-border rounded-lg text-lg font-medium text-text-primary hover:border-primary hover:bg-primary-light transition-all"
          >
            {option}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-text-muted mt-4">
        Problem {currentProblem + 1} of {problems.length}
      </p>
    </div>
  );
}
