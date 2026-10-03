import React, { useState } from 'react';
import { Calendar, Upload, Target, FileText, BookOpen, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { getSubjectById } from '../data/mock-data';

type PrepState = 'setup' | 'plan';

export default function ExamPrepPage() {
  const { subjects } = useAppState();
  const [state, setState] = useState<PrepState>('setup');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [targetGrade, setTargetGrade] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState('');

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials(prev => [...prev, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const generatePlan = () => {
    if (selectedSubject && examDate && targetGrade) {
      setState('plan');
    }
  };

  const subject = getSubjectById(selectedSubject);

  // Generate mock study plan based on inputs
  const generateStudyPlan = () => {
    const today = new Date();
    const exam = new Date(examDate);
    const daysUntilExam = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const planSteps = [
      { day: 'Today', title: 'Guided Lesson', description: 'Start with core concepts', icon: BookOpen, color: 'text-primary', bg: 'bg-primary-light' },
      { day: 'Today', title: 'Smart Text Summary', description: 'Key points from your materials', icon: FileText, color: 'text-success', bg: 'bg-success-light' },
      { day: 'Tomorrow', title: 'Flashcards', description: 'Memorize key terms and formulas', icon: FileText, color: 'text-warning', bg: 'bg-warning-light' },
      { day: 'Tomorrow', title: 'Quiz Practice', description: 'Test your understanding', icon: Target, color: 'text-primary', bg: 'bg-primary-light' },
      { day: 'Day After', title: 'Knowledge Gaps', description: 'Focus on weak areas', icon: Target, color: 'text-danger', bg: 'bg-danger-light' },
      { day: 'Day After', title: 'True/False Review', description: 'Quick concept check', icon: CheckCircle, color: 'text-success', bg: 'bg-success-light' },
      { day: '3 Days Before', title: 'Mock Exam', description: 'Full timed practice exam', icon: Clock, color: 'text-warning', bg: 'bg-warning-light' },
      { day: '2 Days Before', title: 'Revision', description: 'Review weak topics only', icon: BookOpen, color: 'text-primary', bg: 'bg-primary-light' },
      { day: '1 Day Before', title: 'Final Review', description: 'Light revision, rest well', icon: CheckCircle, color: 'text-success', bg: 'bg-success-light' },
    ];

    return { daysUntilExam, planSteps };
  };

  if (state === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Exam Prep</h1>
          <p className="text-text-secondary mt-2">Set up your personalized study plan</p>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <BookOpen size={14} className="inline mr-1" />
              What subject are you preparing for?
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select a subject</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
              ))}
            </select>
          </div>

          {/* Exam Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <Calendar size={14} className="inline mr-1" />
              When is your exam?
            </label>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Target Grade */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <Target size={14} className="inline mr-1" />
              What's your target grade?
            </label>
            <select
              value={targetGrade}
              onChange={e => setTargetGrade(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Select target grade</option>
              <option value="A+">A+ (95%+)</option>
              <option value="A">A (90-94%)</option>
              <option value="B+">B+ (85-89%)</option>
              <option value="B">B (80-84%)</option>
              <option value="C+">C+ (75-79%)</option>
              <option value="C">C (70-74%)</option>
              <option value="pass">Pass (60%+)</option>
            </select>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <Upload size={14} className="inline mr-1" />
              Add your study materials (optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newMaterial}
                onChange={e => setNewMaterial(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addMaterial()}
                placeholder="e.g., Chapter 3 notes, Past paper 2024..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                onClick={addMaterial}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Add
              </button>
            </div>
            {materials.length > 0 && (
              <div className="space-y-1">
                {materials.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-border-light rounded-lg text-sm">
                    <FileText size={14} className="text-text-muted" />
                    <span className="text-text-primary">{m}</span>
                    <button
                      onClick={() => setMaterials(prev => prev.filter((_, idx) => idx !== i))}
                      className="ml-auto text-text-muted hover:text-danger"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-text-muted mt-2">
              You can add lecture notes, past papers, textbook chapters, or any study material.
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePlan}
            disabled={!selectedSubject || !examDate || !targetGrade}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Generate Study Plan
          </button>
        </div>
      </div>
    );
  }

  // Plan view
  const { daysUntilExam, planSteps } = generateStudyPlan();
  const masteryTarget = parseInt(targetGrade.replace(/[^0-9]/g, '')) || 75;

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Header */}
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-text-primary">Your Study Plan</h1>
            <p className="text-sm text-text-secondary mt-1">
              {subject?.icon} {subject?.name} • Target: {targetGrade}
            </p>
          </div>
          <button
            onClick={() => setState('setup')}
            className="text-sm text-primary font-medium hover:underline"
          >
            Edit
          </button>
        </div>

        {/* Mastery Progress */}
        <div className="bg-border-light/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">We'll guide you to {masteryTarget}% mastery</span>
            <span className="text-sm text-text-muted">by {new Date(examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '12%' }} />
          </div>
          <p className="text-xs text-text-muted mt-2">12% current mastery • {daysUntilExam} days until exam</p>
        </div>
      </div>

      {/* Study Steps */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-text-primary">Your Learning Path</h2>
        {planSteps.map((step, i) => {
          const Icon = step.icon;
          const isCompleted = i < 2;
          return (
            <div
              key={i}
              className={`bg-surface rounded-xl border p-4 shadow-sm flex items-center gap-4 transition-all hover:shadow-md ${
                isCompleted ? 'border-success/30 opacity-75' : 'border-border'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${step.bg} ${step.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-text-primary">{step.title}</h3>
                  {isCompleted && <CheckCircle size={14} className="text-success" />}
                </div>
                <p className="text-sm text-text-muted">{step.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-text-secondary">{step.day}</p>
                {!isCompleted && <ChevronRight size={16} className="text-text-muted ml-auto mt-1" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Materials */}
      {materials.length > 0 && (
        <div className="mt-6 bg-surface rounded-xl border border-border p-5 shadow-sm">
          <h3 className="font-semibold text-text-primary mb-3">Your Materials</h3>
          <div className="space-y-2">
            {materials.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                <FileText size={14} className="text-text-muted" />
                {m}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
