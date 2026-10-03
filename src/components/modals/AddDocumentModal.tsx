import React, { useState, useRef } from 'react';
import { X, Upload, Link, FileText, Image, Music, Video, BookOpen } from 'lucide-react';
import { useAppState } from '../../context/AppContext';
import type { DocumentType } from '../../types';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: string;
}

const DOC_TYPES: { type: DocumentType; label: string; icon: any; accept?: string }[] = [
  { type: 'pdf', label: 'PDF', icon: FileText, accept: '.pdf' },
  { type: 'notes', label: 'Notes', icon: FileText },
  { type: 'book', label: 'Book', icon: BookOpen, accept: '.pdf,.epub' },
  { type: 'link', label: 'Link', icon: Link },
  { type: 'image', label: 'Image', icon: Image, accept: 'image/*' },
  { type: 'audio', label: 'Audio', icon: Music, accept: 'audio/*' },
  { type: 'video', label: 'Video', icon: Video, accept: 'video/*' },
];

export default function AddDocumentModal({ isOpen, onClose, subjectId }: AddDocumentModalProps) {
  const { addDocument } = useAppState();
  const [docType, setDocType] = useState<DocumentType>('pdf');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [fileData, setFileData] = useState<string | undefined>();
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState<number | undefined>();
  const [mimeType, setMimeType] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);

    // Auto-set name if empty
    if (!name) {
      setName(file.name.replace(/\.[^/.]+$/, ''));
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onload = () => {
      setFileData(reader.result as string);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      alert('Failed to read file. Please try a smaller file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addDocument({
      subjectId,
      name: name.trim(),
      type: docType,
      description: description.trim() || undefined,
      fileData,
      fileSize,
      mimeType,
      url: docType === 'link' ? url.trim() : undefined,
      content: docType === 'notes' ? content : undefined,
    });

    // Reset
    setName('');
    setDescription('');
    setUrl('');
    setContent('');
    setFileData(undefined);
    setFileName('');
    setFileSize(undefined);
    setMimeType(undefined);
    setDocType('pdf');
    onClose();
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!isOpen) return null;

  const needsFileUpload = ['pdf', 'book', 'image', 'audio', 'video'].includes(docType);
  const needsUrl = docType === 'link';
  const needsText = docType === 'notes';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-xl border border-border shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Add Document</h2>
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
          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Document Type
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {DOC_TYPES.map(dt => {
                const Icon = dt.icon;
                return (
                  <button
                    key={dt.type}
                    type="button"
                    onClick={() => {
                      setDocType(dt.type);
                      setFileData(undefined);
                      setFileName('');
                    }}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-medium transition-all ${
                      docType === dt.type
                        ? 'bg-primary-light text-primary ring-2 ring-primary/30'
                        : 'bg-border-light text-text-secondary hover:bg-border'
                    }`}
                  >
                    <Icon size={18} />
                    {dt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Upload */}
          {needsFileUpload && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Upload File
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-light/30 transition-colors"
              >
                {isProcessing ? (
                  <p className="text-sm text-text-muted">Processing file...</p>
                ) : fileName ? (
                  <div>
                    <p className="text-sm font-medium text-text-primary">{fileName}</p>
                    <p className="text-xs text-text-muted mt-1">{formatFileSize(fileSize)}</p>
                    <p className="text-xs text-primary mt-2">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <Upload size={24} className="mx-auto text-text-muted mb-2" />
                    <p className="text-sm text-text-secondary">Click to upload file</p>
                    <p className="text-xs text-text-muted mt-1">
                      {DOC_TYPES.find(d => d.type === docType)?.accept || 'Any file'}
                    </p>
                    <p className="text-xs text-text-muted mt-1">Max recommended: 5MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={DOC_TYPES.find(d => d.type === docType)?.accept}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* URL Input */}
          {needsUrl && (
            <div>
              <label htmlFor="doc-url" className="block text-sm font-medium text-text-secondary mb-1.5">
                URL *
              </label>
              <input
                id="doc-url"
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/resource"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
          )}

          {/* Notes Text */}
          {needsText && (
            <div>
              <label htmlFor="doc-content" className="block text-sm font-medium text-text-secondary mb-1.5">
                Notes Content
              </label>
              <textarea
                id="doc-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your notes here..."
                rows={6}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="doc-name" className="block text-sm font-medium text-text-secondary mb-1.5">
              Name *
            </label>
            <input
              id="doc-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Chapter 3 Notes, Research Paper"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="doc-desc" className="block text-sm font-medium text-text-secondary mb-1.5">
              Description (optional)
            </label>
            <textarea
              id="doc-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description..."
              rows={2}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
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
              disabled={!name.trim() || isProcessing || (needsFileUpload && !fileData) || (needsUrl && !url.trim())}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
