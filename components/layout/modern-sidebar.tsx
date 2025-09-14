'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Building2, 
  Users, 
  Settings,
  Package,
  Clock,
  CheckCircle,
  PlusCircle,
  Briefcase,
  ChevronRight,
  TrendingUp,
  FileCheck,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface SidebarProps {
  role: string
  isOpen?: boolean
  onClose?: () => void
}

export function ModernSidebar({ role, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['services'])

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => 
      prev.includes(group) 
        ? prev.filter(g => g !== group)
        : [...prev, group]
    )
  }

  const navigationGroups = [
    {
      title: 'Main',
      items: [
        { 
          name: 'Home', 
          href: '/dashboard', 
          icon: Home, 
          roles: ['ADMIN', 'STAFF', 'CLIENT'],
          badge: null
        },
      ]
    },
    {
      title: 'Services',
      collapsible: true,
      key: 'services',
      items: [
        { 
          name: 'Start Registration', 
          href: '/services', 
          icon: PlusCircle, 
          roles: ['ADMIN', 'STAFF', 'CLIENT'],
          badge: 'New',
          badgeColor: 'bg-[var(--brand)]'
        },
        { 
          name: 'Service Requests', 
          href: '/sr', 
          icon: FileText, 
          roles: ['ADMIN', 'STAFF', 'CLIENT'],
          badge: null
        },
        { 
          name: 'In Progress', 
          href: '/sr/in-progress', 
          icon: Clock, 
          roles: ['ADMIN', 'STAFF', 'CLIENT'],
          badge: '12',
          badgeColor: 'bg-[var(--warn)]'
        },
        { 
          name: 'Completed', 
          href: '/sr/completed', 
          icon: CheckCircle, 
          roles: ['ADMIN', 'STAFF', 'CLIENT'],
          badge: null
        },
      ]
    },
    {
      title: 'Management',
      collapsible: true,
      key: 'management',
      items: [
        { 
          name: 'Registered Companies', 
          href: '/companies', 
          icon: Building2, 
          roles: ['ADMIN', 'STAFF'],
          badge: '48',
          badgeColor: 'bg-blue-500'
        },
        { 
          name: 'Documents', 
          href: '/documents', 
          icon: FileCheck, 
          roles: ['ADMIN', 'STAFF', 'CLIENT'],
          badge: null
        },
        { 
          name: 'Reports', 
          href: '/reports', 
          icon: TrendingUp, 
          roles: ['ADMIN', 'STAFF'],
          badge: null
        },
      ]
    },
    {
      title: 'System',
      items: [
        { 
          name: 'Users', 
          href: '/users', 
          icon: Users, 
          roles: ['ADMIN'],
          badge: null
        },
        { 
          name: 'Settings', 
          href: '/settings', 
          icon: Settings, 
          roles: ['ADMIN'],
          badge: null
        },
      ]
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[var(--ink)] border-r border-[var(--border)]",
        "transition-transform duration-300 ease-in-out z-40",
        "overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--surface-light)] scrollbar-track-transparent",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-[var(--surface)] rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>

        <nav className="p-4 space-y-6">
          {navigationGroups.map((group) => {
            const filteredItems = group.items.filter(item => item.roles.includes(role))
            
            if (filteredItems.length === 0) return null

            const isExpanded = !group.collapsible || expandedGroups.includes(group.key || '')

            return (
              <div key={group.title}>
                {/* Group Title */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    {group.title}
                  </h3>
                  {group.collapsible && (
                    <button
                      onClick={() => toggleGroup(group.key!)}
                      className="p-1 hover:bg-[var(--surface)] rounded transition-colors"
                    >
                      <ChevronRight 
                        className={cn(
                          "w-3 h-3 text-[var(--text-muted)] transition-transform duration-200",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </button>
                  )}
                </div>

                {/* Group Items */}
                <div className={cn(
                  "space-y-1 overflow-hidden transition-all duration-200",
                  !isExpanded && "max-h-0",
                  isExpanded && "max-h-[500px]"
                )}>
                  {filteredItems.map((item) => {
                    const isActive = pathname === item.href || 
                                   (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200",
                          "group relative overflow-hidden",
                          isActive 
                            ? 'bg-[var(--brand)] text-white shadow-lg shadow-orange-500/20' 
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        )}

                        <div className="flex items-center space-x-3 relative">
                          <Icon className={cn(
                            "w-5 h-5 transition-transform duration-200",
                            !isActive && "group-hover:scale-110"
                          )} />
                          <span className="font-medium">{item.name}</span>
                        </div>

                        {/* Badge */}
                        {item.badge && (
                          <span className={cn(
                            "px-2 py-0.5 text-xs font-medium rounded-full",
                            item.badgeColor || 'bg-[var(--surface-light)]',
                            isActive ? 'text-white bg-white/20' : 'text-white'
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)] bg-[var(--ink)]">
          <div className="bg-gradient-to-r from-[var(--brand)]/10 to-[var(--brand-dark)]/10 rounded-xl p-4 border border-[var(--brand)]/20">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Need Help?</h4>
            <p className="text-xs text-[var(--text-secondary)] mb-3">
              Get support from our team
            </p>
            <button className="w-full py-2 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white text-sm font-medium rounded-lg transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}