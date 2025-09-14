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
  CheckCircle
} from 'lucide-react'

interface SidebarProps {
  role: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['ADMIN', 'STAFF', 'CLIENT'] },
    { name: 'Services', href: '/services', icon: Package, roles: ['ADMIN', 'STAFF', 'CLIENT'] },
    { name: 'In Progress', href: '/sr/in-progress', icon: Clock, roles: ['ADMIN', 'STAFF', 'CLIENT'] },
    { name: 'Completed', href: '/sr/completed', icon: CheckCircle, roles: ['ADMIN', 'STAFF', 'CLIENT'] },
    { name: 'Companies', href: '/companies', icon: Building2, roles: ['ADMIN', 'STAFF'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['ADMIN'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['ADMIN'] },
  ]

  const filteredNav = navigation.filter(item => item.roles.includes(role))

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-black/30 backdrop-blur-md border-r border-white/10">
      <nav className="p-4 space-y-1">
        {filteredNav.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all
                ${isActive 
                  ? 'bg-brand/20 text-brand border border-brand/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}