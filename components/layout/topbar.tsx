'use client'

import { signOut } from 'next-auth/react'
import { User, LogOut, Bell } from 'lucide-react'

interface TopBarProps {
  user: {
    email: string
    role: string
  }
}

export function TopBar({ user }: TopBarProps) {
  return (
    <header className="h-16 bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SZ</span>
            </div>
            <span className="text-xl font-semibold text-white">Startup Zone</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center space-x-3 px-3 py-2 bg-white/5 rounded-lg">
            <User className="w-4 h-4 text-gray-400" />
            <div className="text-sm">
              <p className="text-white font-medium">{user.email}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}