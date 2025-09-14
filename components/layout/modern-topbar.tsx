'use client'

import { signOut } from 'next-auth/react'
import { Search, Bell, User, LogOut, Settings, Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  user: {
    email: string
    role: string
  }
  onMenuClick?: () => void
}

export function ModernTopBar({ user, onMenuClick }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, title: 'New service request', message: 'License renewal submitted', time: '5m ago', unread: true },
    { id: 2, title: 'Document uploaded', message: 'Trade license PDF received', time: '1h ago', unread: true },
    { id: 3, title: 'Status update', message: 'SR-001234 approved', time: '2h ago', unread: false },
  ]

  return (
    <header className="h-16 bg-[var(--ink)] border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-xl bg-opacity-90">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-[var(--text-primary)]" />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[var(--brand)] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-lg">SZ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-[var(--text-primary)]">Startup Zone</h1>
              <p className="text-xs text-[var(--text-muted)]">Business Portal</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className={cn(
            "relative w-full transition-all duration-300",
            searchFocused && "scale-105"
          )}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search services, companies, or requests..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border rounded-xl",
                "text-[var(--text-primary)] placeholder-[var(--text-muted)]",
                "focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20",
                "transition-all duration-300",
                searchFocused ? "border-[var(--brand)]" : "border-[var(--border)]"
              )}
            />
            {searchFocused && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[var(--text-muted)]">
                <kbd className="px-2 py-1 bg-[var(--surface-light)] rounded border border-[var(--border)]">ESC</kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-[var(--surface)] rounded-lg transition-all duration-200 group"
            >
              <Bell className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--brand)] rounded-full animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl">
                <div className="p-4 border-b border-[var(--border)]">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-4 border-b border-[var(--border)] hover:bg-[var(--surface-light)] transition-colors cursor-pointer",
                        notif.unread && "bg-[var(--brand)]/5"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[var(--text-primary)]">{notif.title}</p>
                          <p className="text-xs text-[var(--text-secondary)] mt-1">{notif.message}</p>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button className="text-sm text-[var(--brand)] hover:text-[var(--brand-light)] transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-[var(--surface)] rounded-lg transition-all duration-200 group">
            <Settings className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 px-3 py-2 bg-[var(--surface)] hover:bg-[var(--surface-light)] rounded-xl transition-all duration-200 border border-[var(--border)]"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-dark)] rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-[var(--text-primary)]">{user.email.split('@')[0]}</p>
                <p className="text-xs text-[var(--text-muted)] capitalize">{user.role.toLowerCase()}</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl">
                <div className="p-4 border-b border-[var(--border)]">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{user.email}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 capitalize">Role: {user.role.toLowerCase()}</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-[var(--surface-light)] rounded-lg transition-colors">
                    <User className="w-4 h-4 text-[var(--text-secondary)]" />
                    <span className="text-sm text-[var(--text-primary)]">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-[var(--surface-light)] rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-[var(--text-secondary)]" />
                    <span className="text-sm text-[var(--text-primary)]">Settings</span>
                  </button>
                </div>
                <div className="p-2 border-t border-[var(--border)]">
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}