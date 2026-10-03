import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Bot, User, Sparkles, BookOpen, HelpCircle, FileText, Lightbulb, GraduationCap } from 'lucide-react';
import { aiProvider } from '../lib/ai-provider';
import { getTopicById, getSubjectById, getChapterById } from '../data/mock-data';
import type { AIMessage, AIContext } from '../types';

const quickActions = [
  { label: 'Explain Simply', action: 'explain-simply', icon: Lightbulb },
  { label: 'Give Example', action: 'give-example', icon: BookOpen },
  { label: 'Quiz Me', action: 'quiz-me', icon: HelpCircle },
  { label: 'Summarize', action: 'summarize', icon: FileText },
  { label: 'Difficult Terms', action: 'explain-difficult', icon: Sparkles },
  { label: 'Board Questions', action: 'board-questions', icon: GraduationCap },
];

export default function AITutorPage() {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic') ?? 'cs-ch3-t2';
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const topic = getTopicById(topicId);
  const subject = topic ? getSubjectById(topic.subjectId) : null;
  const chapter = topic ? getChapterById(topic.chapterId) : null;

  const context: AIContext = {
    subject: subject?.name ?? 'Computer Science',
    chapter: chapter?.name ?? 'Data Structures',
    topic: topic?.name ?? 'Stacks',
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiProvider.sendMessage(context, content);
      const assistantMessage: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    setLoading(true);
    const actionLabel = quickActions.find(a => a.action === action)?.label ?? action;
    const userMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: actionLabel,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await aiProvider.quickAction(context, action);
      const assistantMessage: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col h-[calc(100vh-4rem)]">
      {/* Context Header */}
      <div className="bg-surface rounded-xl border border-border p-4 mb-4 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Bot size={18} className="text-primary" />
          <h2 className="font-semibold text-text-primary">AI Tutor</h2>
        </div>
        <p className="text-sm text-text-secondary">
          I'm studying: <span className="font-medium text-text-primary">{context.subject}</span>
          {' → '}
          <span className="font-medium text-text-primary">{context.chapter}</span>
          {' → '}
          <span className="font-medium text-text-primary">{context.topic}</span>
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-4 shrink-0">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.action)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-medium text-text-secondary hover:bg-border-light hover:text-text-primary disabled:opacity-50 transition-colors"
            >
              <Icon size={12} />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">How can I help you?</h3>
            <p className="text-sm text-text-muted max-w-sm mx-auto">
              Ask me anything about {context.topic}, or use the quick actions above to get started.
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-xl p-4 ${
              msg.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-surface border border-border'
            }`}>
              <div className={`text-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user' ? 'text-white' : 'text-text-secondary'
              }`}>
                {formatMessage(msg.content)}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-border-light flex items-center justify-center shrink-0">
                <User size={16} className="text-text-secondary" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
              <Bot size={16} className="text-primary" />
            </div>
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0">
        <form
          onSubmit={e => { e.preventDefault(); sendMessage(input); }}
          className="flex items-center gap-2 bg-surface border border-border rounded-xl p-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about this topic..."
            className="flex-1 px-3 py-2 text-sm text-text-primary placeholder:text-text-muted bg-transparent focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

function formatMessage(content: string): React.ReactNode {
  // Simple markdown-like formatting
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
