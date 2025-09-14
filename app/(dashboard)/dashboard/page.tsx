import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { 
  FileText, 
  Building2, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Package,
  Users,
  AlertCircle
} from 'lucide-react'
import { CircularProgress } from '@/components/ui/circular-progress'

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Get statistics based on role
  const isClient = session?.user.role === 'CLIENT'
  
  const totalRequests = await prisma.serviceRequest.count({
    where: isClient ? { createdById: session.user.id } : {}
  })
  
  const inProgressRequests = await prisma.serviceRequest.count({
    where: {
      ...(isClient && { createdById: session.user.id }),
      status: { not: 'COMPLETED' }
    }
  })
  
  const completedRequests = await prisma.serviceRequest.count({
    where: {
      ...(isClient && { createdById: session.user.id }),
      status: 'COMPLETED'
    }
  })

  const recentRequests = await prisma.serviceRequest.findMany({
    where: isClient ? { createdById: session.user.id } : {},
    include: {
      template: true,
      createdBy: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  const stats = [
    {
      label: 'Total Requests',
      value: totalRequests,
      icon: FileText,
      color: 'text-brand',
      bgColor: 'bg-brand/20'
    },
    {
      label: 'In Progress',
      value: inProgressRequests,
      icon: Clock,
      color: 'text-warn',
      bgColor: 'bg-warn/20'
    },
    {
      label: 'Completed',
      value: completedRequests,
      icon: CheckCircle,
      color: 'text-safe',
      bgColor: 'bg-safe/20'
    },
    {
      label: 'Success Rate',
      value: totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0,
      suffix: '%',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {session?.user.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                {stat.suffix === '%' && (
                  <CircularProgress value={stat.value} size={48} />
                )}
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">
                {stat.value}{stat.suffix}
              </p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <a 
          href="/services"
          className="bg-brand/10 border border-brand/30 rounded-xl p-6 hover:bg-brand/20 transition-all group"
        >
          <Package className="w-8 h-8 text-brand mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Browse Services</h3>
          <p className="text-sm text-gray-400">Start a new service application</p>
        </a>
        
        <a 
          href="/sr/in-progress"
          className="bg-warn/10 border border-warn/30 rounded-xl p-6 hover:bg-warn/20 transition-all group"
        >
          <Clock className="w-8 h-8 text-warn mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Track Requests</h3>
          <p className="text-sm text-gray-400">Monitor your active requests</p>
        </a>
        
        {!isClient && (
          <a 
            href="/companies"
            className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-6 hover:bg-blue-400/20 transition-all group"
          >
            <Building2 className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Manage Companies</h3>
            <p className="text-sm text-gray-400">View registered companies</p>
          </a>
        )}
      </div>

      {/* Recent Requests */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Requests</h2>
        
        {recentRequests.length > 0 ? (
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {request.template.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      SR-{request.id.slice(-6).toUpperCase()} • {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`
                  px-2 py-1 text-xs rounded-md font-medium
                  ${request.status === 'DRAFT' ? 'bg-gray-500/20 text-gray-400' : ''}
                  ${request.status === 'SUBMITTED' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${request.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  ${request.status === 'COMPLETED' ? 'bg-safe/20 text-safe' : ''}
                `}>
                  {request.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No recent requests</p>
            <a href="/services" className="text-brand hover:underline text-sm mt-2 inline-block">
              Start your first application →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}