import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, Brain, FileText, Bot, BarChart3,
  Calendar, Settings, Menu, X, Search, Bell, ChevronDown,
  Moon, Sun
} from 'lucide-react';
import { useAppState } from '../../context/AppContext';

const navItems = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Subjects', path: '/subjects', icon: BookOpen },
  { label: 'Practice', path: '/practice', icon: Brain },
  { label: 'Exams', path: '/exams', icon: FileText },
  { label: 'AI Tutor', path: '/ai-tutor', icon: Bot },
  { label: 'Progress', path: '/progress', icon: BarChart3 },
  { label: 'Planner', path: '/planner', icon: Calendar },
];

// ============================================================
// Sidebar (Desktop)
// ============================================================
export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-border h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-xl font-bold text-text-primary">
          <span className="text-primary">Study</span>OS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-text-secondary hover:bg-border-light hover:text-text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 py-4 border-t border-border">
        <NavLink
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === '/settings'
              ? 'bg-primary-light text-primary'
              : 'text-text-secondary hover:bg-border-light hover:text-text-primary'
          }`}
        >
          <Settings size={18} aria-hidden="true" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}

// ============================================================
// Top Header
// ============================================================
export function TopHeader() {
  const { darkMode, toggleDarkMode, user } = useAppState();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Mobile menu button */}
        <MobileMenuButton />

        {/* Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search lessons, topics..."
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-text-secondary hover:bg-border-light transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="p-2 rounded-lg text-text-secondary hover:bg-border-light transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium text-text-primary hidden md:block">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// Mobile Navigation (Bottom)
// ============================================================
export function MobileNav() {
  const location = useLocation();
  const mobileItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Study', path: '/subjects', icon: BookOpen },
    { label: 'Practice', path: '/practice', icon: Brain },
    { label: 'AI', path: '/ai-tutor', icon: Bot },
    { label: 'Profile', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors min-w-[56px] ${
                isActive ? 'text-primary' : 'text-text-muted'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

// ============================================================
// Mobile Menu (Slide-out)
// ============================================================
function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <button
        className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-border-light"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-surface shadow-xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <h2 className="text-lg font-bold text-text-primary">
                <span className="text-primary">Study</span>OS
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-border-light"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-light text-primary'
                        : 'text-text-secondary hover:bg-border-light'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// App Shell Layout
// ============================================================
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopHeader />
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
