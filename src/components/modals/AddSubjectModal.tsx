import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppState } from '../../context/AppContext';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_OPTIONS = ['📚', '🧮', '🔬', '🌍', '🎨', '💻', '📐', '🧪', '🎵', '🏛️', '🧬', '📊', '🗣️', '⚖️', '🏥', '🔧'];
const COLOR_OPTIONS = [
  '#4f46e5', '#7c3aed', '#db2777', '#dc2626',
  '#ea580c', '#d97706', '#65a30d', '#059669',
  '#0891b2', '#2563eb', '#4338ca', '#9333ea'
];

export default function AddSubjectModal({ isOpen, onClose }: AddSubjectModalProps) {
  const { addUserSubject } = useAppState();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📚');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addUserSubject({
      name: name.trim(),
      icon,
      color,
      description: description.trim() || undefined,
    });

    // Reset form
    setName('');
    setIcon('📚');
    setColor(COLOR_OPTIONS[0]);
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-xl border border-border shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Add New Subject</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-border-light transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="subject-name" className="block text-sm font-medium text-text-secondary mb-1.5">
              Subject Name *
            </label>
            <input
              id="subject-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Biology, Economics, Art History"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="subject-desc" className="block text-sm font-medium text-text-secondary mb-1.5">
              Description (optional)
            </label>
            <textarea
              id="subject-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of this subject..."
              rows={2}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Icon
            </label>
            <div className="grid grid-cols-8 gap-2">
              {ICON_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`p-2 rounded-lg text-xl transition-all ${
                    icon === emoji
                      ? 'bg-primary-light ring-2 ring-primary scale-110'
                      : 'bg-border-light hover:bg-border'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_OPTIONS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-9 rounded-lg transition-all ${
                    color === c ? 'ring-2 ring-offset-2 ring-offset-surface ring-primary scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-border-light/50 rounded-lg">
            <p className="text-xs text-text-muted mb-2">Preview</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-medium text-text-primary" style={{ color }}>
                  {name || 'Subject Name'}
                </p>
                <p className="text-xs text-text-muted">
                  {description || 'Description will appear here'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-border-light text-text-secondary rounded-lg text-sm font-medium hover:bg-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
