import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Check, X, Shuffle, Volume2 } from 'lucide-react';
import { mockFlashcardDecks, getSubjectById } from '../data/mock-data';
import type { FlashcardDeck, Flashcard } from '../types';

type FlashcardMode = 'decks' | 'study' | 'results';

export default function FlashcardsPage() {
  const [mode, setMode] = useState<FlashcardMode>('decks');
  const [activeDeck, setActiveDeck] = useState<FlashcardDeck | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [shuffled, setShuffled] = useState(false);

  const startDeck = (deck: FlashcardDeck) => {
    setActiveDeck(deck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({ correct: 0, incorrect: 0 });
    setMode('study');
  };

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleKnow = () => {
    if (!activeDeck) return;
    setResults(prev => ({ ...prev, correct: prev.correct + 1 }));
    nextCard();
  };

  const handleDontKnow = () => {
    if (!activeDeck) return;
    setResults(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    nextCard();
  };

  const nextCard = () => {
    if (!activeDeck) return;
    if (currentIndex < activeDeck.cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setMode('results');
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    if (!activeDeck) return;
    const shuffledDeck = { ...activeDeck, cards: [...activeDeck.cards].sort(() => Math.random() - 0.5) };
    setActiveDeck(shuffledDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShuffled(true);
    setTimeout(() => setShuffled(false), 1000);
  };

  if (mode === 'decks') {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Flashcards</h1>
          <p className="text-text-secondary mt-1">Review key concepts with spaced repetition</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFlashcardDecks.map(deck => {
            const subject = getSubjectById(deck.subjectId);
            const total = deck.cards.length;
            const mastered = deck.masteredCount;
            const progress = Math.round((mastered / total) * 100);

            return (
              <button
                key={deck.id}
                onClick={() => startDeck(deck)}
                className="bg-surface rounded-xl border border-border p-5 text-left shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{subject?.icon ?? '📚'}</span>
                  <span className="text-xs font-medium text-text-muted bg-border-light px-2 py-0.5 rounded-full">
                    {total} cards
                  </span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">{deck.name}</h3>
                <p className="text-sm text-text-muted mb-3">{subject?.name}</p>
                <div className="space-y-2">
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">{mastered} mastered</span>
                    <span className="text-success font-medium">{progress}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (mode === 'results' && activeDeck) {
    const total = results.correct + results.incorrect;
    const percentage = total > 0 ? Math.round((results.correct / total) * 100) : 0;

    return (
      <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm">
          <div className="text-5xl mb-4">{percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '💪'}</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Session Complete!</h2>
          <p className="text-text-secondary mb-4">{activeDeck.name}</p>
          <div className="text-4xl font-bold text-primary my-4">{percentage}%</div>
          <div className="flex items-center justify-center gap-6 text-sm mt-4">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-success" />
              <span className="text-text-secondary">{results.correct} Knew it</span>
            </div>
            <div className="flex items-center gap-2">
              <X size={16} className="text-danger" />
              <span className="text-text-secondary">{results.incorrect} Need review</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => startDeck(activeDeck)}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Study Again
          </button>
          <button
            onClick={() => setMode('decks')}
            className="flex-1 px-4 py-3 bg-border-light text-text-secondary rounded-lg text-sm font-medium hover:bg-border transition-colors"
          >
            All Decks
          </button>
        </div>
      </div>
    );
  }

  if (!activeDeck) return null;
  const card = activeDeck.cards[currentIndex];

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMode('decks')} className="text-sm text-text-muted hover:text-primary">
          ← Back
        </button>
        <span className="text-sm text-text-muted">
          {currentIndex + 1} / {activeDeck.cards.length}
        </span>
        <button
          onClick={shuffleCards}
          className={`p-2 rounded-lg transition-colors ${shuffled ? 'text-primary bg-primary-light' : 'text-text-muted hover:bg-border-light'}`}
          aria-label="Shuffle cards"
        >
          <Shuffle size={16} />
        </button>
      </div>

      <div className="h-1.5 bg-border rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / activeDeck.cards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div
        onClick={handleFlip}
        className="relative cursor-pointer mb-6"
        style={{ perspective: '1000px' }}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleFlip()}
        aria-label={isFlipped ? 'Show question' : 'Show answer'}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '280px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-surface rounded-xl border border-border p-8 flex flex-col items-center justify-center shadow-sm"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs font-medium text-text-muted uppercase tracking-wide mb-4">Question</span>
            <p className="text-lg font-medium text-text-primary text-center leading-relaxed">{card.front}</p>
            <span className="absolute bottom-4 text-xs text-text-muted">Tap to reveal answer</span>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 bg-primary-light rounded-xl border border-primary/20 p-8 flex flex-col items-center justify-center shadow-sm"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-xs font-medium text-primary uppercase tracking-wide mb-4">Answer</span>
            <p className="text-base text-text-primary text-center leading-relaxed whitespace-pre-line">{card.back}</p>
            <span className="absolute bottom-4 text-xs text-text-muted">Tap to see question</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="p-3 rounded-lg border border-border text-text-muted hover:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous card"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleDontKnow}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-danger-light text-danger rounded-lg font-medium text-sm hover:bg-danger/10 transition-colors"
        >
          <X size={16} />
          Still Learning
        </button>
        <button
          onClick={handleKnow}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-success-light text-success rounded-lg font-medium text-sm hover:bg-success/10 transition-colors"
        >
          <Check size={16} />
          Got It!
        </button>
        <button
          onClick={nextCard}
          disabled={currentIndex === activeDeck.cards.length - 1}
          className="p-3 rounded-lg border border-border text-text-muted hover:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next card"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="text-center text-xs text-text-muted mt-4">
        Card {currentIndex + 1} of {activeDeck.cards.length} • {card.difficulty}
      </p>
    </div>
  );
}
