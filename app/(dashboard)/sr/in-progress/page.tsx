import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Clock, User, FileText, MoreVertical } from 'lucide-react'

const prisma = new PrismaClient()

export default async function InProgressPage() {
  const session = await getServerSession(authOptions)
  
  // Get in-progress requests based on role
  const where = session?.user.role === 'CLIENT' 
    ? { createdById: session.user.id, status: { not: 'COMPLETED' } }
    : { status: { not: 'COMPLETED' } }

  const requests = await prisma.serviceRequest.findMany({
    where,
    include: {
      template: true,
      createdBy: true,
      assignee: true,
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">In Progress Requests</h1>
        <p className="text-gray-400">Track and manage active service requests</p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                SR-ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-brand">
                    SR-{request.id.slice(-6).toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-white">
                    {request.companyName || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">{request.template.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    px-2 py-1 text-xs rounded-md font-medium
                    ${request.status === 'DRAFT' ? 'bg-gray-500/20 text-gray-400' : ''}
                    ${request.status === 'SUBMITTED' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${request.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${request.status === 'PENDING_DOCS' ? 'bg-orange-500/20 text-orange-400' : ''}
                  `}>
                    {request.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.assignee ? (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-white">{request.assignee.email.split('@')[0]}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No requests in progress</p>
          </div>
        )}
      </div>
    </div>
  )
}