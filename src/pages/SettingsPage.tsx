import React, { useState } from 'react';
import { User, Palette, Bell, BookOpen, Shield, Moon, Sun } from 'lucide-react';
import { useAppState } from '../context/AppContext';

type SettingsTab = 'profile' | 'appearance' | 'notifications' | 'study' | 'account';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user, darkMode, toggleDarkMode } = useAppState();

  const tabs: { id: SettingsTab; label: string; icon: any }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'study', label: 'Study Preferences', icon: BookOpen },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <nav className="md:w-48 shrink-0">
          <div className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-light text-primary'
                      : 'text-text-secondary hover:bg-border-light'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
              <h2 className="font-semibold text-text-primary">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">{user.name}</p>
                  <p className="text-sm text-text-muted">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                  <input type="text" defaultValue={user.name} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                  <input type="email" defaultValue={user.email} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Class</label>
                  <input type="text" defaultValue={user.class} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Board</label>
                  <input type="text" defaultValue={user.board} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-6">
              <h2 className="font-semibold text-text-primary">Appearance</h2>
              <div className="flex items-center justify-between p-4 bg-border-light/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={18} className="text-text-secondary" /> : <Sun size={18} className="text-text-secondary" />}
                  <div>
                    <p className="text-sm font-medium text-text-primary">Dark Mode</p>
                    <p className="text-xs text-text-muted">Switch between light and dark theme</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-border'}`}
                  role="switch"
                  aria-checked={darkMode}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? 'left-[22px]' : 'left-[2px]'}`} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-text-primary">Notifications</h2>
              {[
                { label: 'Study Reminders', desc: 'Get reminded about your study sessions' },
                { label: 'Practice Alerts', desc: 'Notifications about recommended practice' },
                { label: 'Progress Updates', desc: 'Weekly progress summaries' },
                { label: 'New Content', desc: 'When new lessons are added' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-border-light/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.label}</p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-primary relative" role="switch" aria-checked="true">
                    <span className="absolute top-0.5 left-[22px] w-5 h-5 bg-white rounded-full shadow" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'study' && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-text-primary">Study Preferences</h2>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Daily Study Goal (minutes)</label>
                <input type="number" defaultValue={120} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Questions per Practice Session</label>
                <input type="number" defaultValue={10} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Preferred Difficulty</label>
                <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option>Mixed</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-text-primary">Account</h2>
              <div className="p-4 bg-border-light/50 rounded-lg">
                <p className="text-sm font-medium text-text-primary">Authentication</p>
                <p className="text-xs text-text-muted mt-1">Authentication will be connected via Supabase Auth in a future update.</p>
              </div>
              <div className="p-4 bg-border-light/50 rounded-lg">
                <p className="text-sm font-medium text-text-primary">Data & Privacy</p>
                <p className="text-xs text-text-muted mt-1">Your data is stored securely. No data is shared with third parties.</p>
              </div>
              <div className="pt-4 border-t border-border">
                <button className="px-4 py-2 bg-danger-light text-danger rounded-lg text-sm font-medium hover:bg-danger/10 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
