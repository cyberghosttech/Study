import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useAppState } from '../context/AppContext';

export default function SubjectsPage() {
  const { subjects } = useAppState();
  const [search, setSearch] = useState('');

  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Subjects</h1>
          <p className="text-text-secondary mt-1">Track your progress across all subjects</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input
            type="search"
            placeholder="Search subjects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted">No subjects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(subject => (
            <Link
              key={subject.id}
              to={`/subjects/${subject.id}`}
              className="bg-surface rounded-xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-semibold text-text-primary">{subject.name}</h3>
                    <p className="text-sm text-text-muted">{subject.completedChapters}/{subject.totalChapters} chapters</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-text-muted group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                  />
                </div>
                <p className="text-sm text-text-secondary">{subject.progress}% complete</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
