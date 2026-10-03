import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Plus, Trash2, FileText, Link as LinkIcon, Image, Music, Video, ExternalLink, Eye, Download } from 'lucide-react';
import { getSubjectById, getChaptersBySubject } from '../data/mock-data';
import { useAppState } from '../context/AppContext';
import AddDocumentModal from '../components/modals/AddDocumentModal';
import type { StudyDocument, DocumentType } from '../types';

export default function SubjectDetailPage() {
  const { subject: subjectId } = useParams<{ subject: string }>();
  const { userSubjects, getDocumentsBySubject, deleteDocument } = useAppState();
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<StudyDocument | null>(null);

  // Check if it's a mock or user-created subject
  const mockSubject = getSubjectById(subjectId ?? '');
  const userSubject = userSubjects.find(s => s.id === subjectId);
  const chapters = getChaptersBySubject(subjectId ?? '');
  const documents = getDocumentsBySubject(subjectId ?? '');

  // User-created subject view
  if (userSubject) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{userSubject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{userSubject.name}</h1>
              {userSubject.description && (
                <p className="text-sm text-text-secondary mt-1">{userSubject.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-medium px-2 py-0.5 bg-primary-light text-primary rounded-full">
              Custom Subject
            </span>
            <span className="text-sm text-text-muted">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'}
            </span>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Documents & Resources</h2>
          <button
            onClick={() => setShowAddDoc(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Plus size={16} />
            Add Document
          </button>
        </div>

        {documents.length === 0 ? (
          <div className="bg-surface rounded-xl border border-border p-8 text-center shadow-sm">
            <FileText size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="font-medium text-text-primary mb-2">No documents yet</h3>
            <p className="text-sm text-text-muted mb-4">
              Add PDFs, notes, books, links, and other resources to this subject.
            </p>
            <button
              onClick={() => setShowAddDoc(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              <Plus size={16} />
              Add Your First Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map(doc => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onView={() => setViewingDoc(doc)}
                onDelete={() => {
                  if (confirm(`Delete "${doc.name}"?`)) {
                    deleteDocument(doc.id);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Document Viewer Modal */}
        {viewingDoc && (
          <DocumentViewer doc={viewingDoc} onClose={() => setViewingDoc(null)} />
        )}

        <AddDocumentModal
          isOpen={showAddDoc}
          onClose={() => setShowAddDoc(false)}
          subjectId={userSubject.id}
        />
      </div>
    );
  }

  // Mock subject view (original)
  if (!mockSubject) {
    return (
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="text-center py-12">
          <p className="text-text-muted">Subject not found.</p>
          <Link to="/subjects" className="text-primary text-sm mt-2 inline-block hover:underline">
            Back to subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{mockSubject.icon}</span>
          <h1 className="text-2xl font-bold text-text-primary">{mockSubject.name}</h1>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex-1 max-w-xs h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${mockSubject.progress}%`, backgroundColor: mockSubject.color }}
            />
          </div>
          <span className="text-sm font-medium text-text-secondary">{mockSubject.progress}%</span>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-3">
        {chapters.map(chapter => (
          <Link
            key={chapter.id}
            to={`/study/${mockSubject.id}/${chapter.id}/${chapter.id}-t${chapter.completedTopics < chapter.totalTopics ? chapter.completedTopics + 1 : chapter.totalTopics}`}
            className="block bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-border-light flex items-center justify-center text-sm font-bold text-text-secondary">
                  {String(chapter.order).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{chapter.name}</h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    {chapter.completedTopics}/{chapter.totalTopics} topics completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block w-24 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${chapter.progress}%`, backgroundColor: mockSubject.color }}
                  />
                </div>
                <span className="text-sm text-text-muted hidden sm:block">{chapter.progress}%</span>
                <ArrowRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Document Card
// ============================================================
function DocumentCard({ doc, onView, onDelete }: { doc: StudyDocument; onView: () => void; onDelete: () => void }) {
  const getIcon = (type: DocumentType) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'notes': return FileText;
      case 'book': return BookOpen;
      case 'link': return LinkIcon;
      case 'image': return Image;
      case 'audio': return Music;
      case 'video': return Video;
      default: return FileText;
    }
  };

  const getColor = (type: DocumentType) => {
    switch (type) {
      case 'pdf': return 'text-danger bg-danger-light';
      case 'notes': return 'text-primary bg-primary-light';
      case 'book': return 'text-success bg-success-light';
      case 'link': return 'text-warning bg-warning-light';
      case 'image': return 'text-primary bg-primary-light';
      case 'audio': return 'text-warning bg-warning-light';
      case 'video': return 'text-danger bg-danger-light';
      default: return 'text-text-muted bg-border-light';
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const Icon = getIcon(doc.type);
  const colorClass = getColor(doc.type);

  return (
    <div className="bg-surface rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg shrink-0 ${colorClass}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text-primary text-sm truncate">{doc.name}</h4>
          {doc.description && (
            <p className="text-xs text-text-muted mt-0.5 truncate">{doc.description}</p>
          )}
          <div className="flex items-center gap-2 mt-1.5 text-xs text-text-muted">
            <span className="capitalize">{doc.type}</span>
            {doc.fileSize && <span>• {formatSize(doc.fileSize)}</span>}
            <span>• {new Date(doc.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        <button
          onClick={onView}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary-light rounded-lg transition-colors"
        >
          <Eye size={12} />
          View
        </button>
        {doc.url && (
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-border-light rounded-lg transition-colors"
          >
            <ExternalLink size={12} />
            Open
          </a>
        )}
        <button
          onClick={onDelete}
          className="inline-flex items-center justify-center p-1.5 text-text-muted hover:text-danger hover:bg-danger-light rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete document"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Document Viewer Modal
// ============================================================
function DocumentViewer({ doc, onClose }: { doc: StudyDocument; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-xl border border-border shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h3 className="font-semibold text-text-primary truncate">{doc.name}</h3>
            <span className="text-xs font-medium px-2 py-0.5 bg-border-light text-text-muted rounded-full capitalize shrink-0">
              {doc.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {doc.fileData && (
              <a
                href={doc.fileData}
                download={doc.name}
                className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
                aria-label="Download"
              >
                <Download size={16} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-border-light transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {doc.type === 'pdf' && doc.fileData ? (
            <iframe
              src={doc.fileData}
              className="w-full h-[60vh] rounded-lg border border-border"
              title={doc.name}
            />
          ) : doc.type === 'image' && doc.fileData ? (
            <img
              src={doc.fileData}
              alt={doc.name}
              className="max-w-full max-h-[60vh] mx-auto rounded-lg"
            />
          ) : doc.type === 'notes' && doc.content ? (
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-text-secondary leading-relaxed font-sans">
                {doc.content}
              </pre>
            </div>
          ) : doc.type === 'link' && doc.url ? (
            <div className="text-center py-8">
              <LinkIcon size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-secondary mb-4">This document is a link to an external resource.</p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                <ExternalLink size={16} />
                Open Link
              </a>
              <p className="text-xs text-text-muted mt-3 break-all">{doc.url}</p>
            </div>
          ) : doc.type === 'audio' && doc.fileData ? (
            <div className="text-center py-8">
              <Music size={48} className="mx-auto text-text-muted mb-4" />
              <audio controls className="w-full max-w-md">
                <source src={doc.fileData} type={doc.mimeType} />
                Your browser does not support audio playback.
              </audio>
            </div>
          ) : doc.type === 'video' && doc.fileData ? (
            <video controls className="w-full max-h-[60vh] rounded-lg">
              <source src={doc.fileData} type={doc.mimeType} />
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="text-center py-8">
              <FileText size={48} className="mx-auto text-text-muted mb-4" />
              <p className="text-text-muted">Preview not available for this file type.</p>
              {doc.fileData && (
                <a
                  href={doc.fileData}
                  download={doc.name}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
                >
                  <Download size={16} />
                  Download File
                </a>
              )}
            </div>
          )}

          {doc.description && (
            <div className="mt-4 p-3 bg-border-light/50 rounded-lg">
              <p className="text-xs font-medium text-text-muted mb-1">Description</p>
              <p className="text-sm text-text-secondary">{doc.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
