import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import AddSubjectModal from '../components/modals/AddSubjectModal';

export default function SubjectsPage() {
  const { subjects, userSubjects, deleteUserSubject, getDocumentsBySubject } = useAppState();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Combine mock subjects and user subjects
  const allSubjects = [
    ...subjects.map(s => ({ ...s, isUserCreated: false, description: undefined, createdAt: undefined })),
    ...userSubjects.map(s => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      color: s.color,
      progress: 0,
      currentChapterId: '',
      totalChapters: 0,
      completedChapters: 0,
      description: s.description,
      isUserCreated: true,
      createdAt: s.createdAt,
    }))
  ];

  const filtered = allSubjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Subjects</h1>
          <p className="text-text-secondary mt-1">Track your progress across all subjects</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="search"
              placeholder="Search subjects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Subject</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted">No subjects found.</p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(subject => {
            const docCount = subject.isUserCreated ? getDocumentsBySubject(subject.id).length : 0;
            return (
              <div key={subject.id} className="relative group">
                <Link
                  to={`/subjects/${subject.id}`}
                  className="bg-surface rounded-xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{subject.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-text-primary">{subject.name}</h3>
                          {subject.isUserCreated && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-primary-light text-primary rounded-full">
                              Custom
                            </span>
                          )}
                        </div>
                        {subject.isUserCreated ? (
                          <p className="text-sm text-text-muted">
                            {docCount} {docCount === 1 ? 'document' : 'documents'}
                            {subject.description && ` • ${subject.description}`}
                          </p>
                        ) : (
                          <p className="text-sm text-text-muted">{subject.completedChapters}/{subject.totalChapters} chapters</p>
                        )}
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                  {!subject.isUserCreated && (
                    <div className="space-y-2">
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                        />
                      </div>
                      <p className="text-sm text-text-secondary">{subject.progress}% complete</p>
                    </div>
                  )}
                </Link>
                {subject.isUserCreated && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm(`Delete "${subject.name}" and all its documents?`)) {
                        deleteUserSubject(subject.id);
                      }
                    }}
                    className="absolute top-3 right-12 p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger-light opacity-0 group-hover:opacity-100 transition-all"
                    aria-label="Delete subject"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AddSubjectModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
