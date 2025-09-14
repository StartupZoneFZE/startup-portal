import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CheckCircle, User, FileText, Download, Calendar } from 'lucide-react'

const prisma = new PrismaClient()

export default async function CompletedPage() {
  const session = await getServerSession(authOptions)
  
  // Get completed requests based on role
  const where = session?.user.role === 'CLIENT' 
    ? { createdById: session.user.id, status: 'COMPLETED' }
    : { status: 'COMPLETED' }

  const requests = await prisma.serviceRequest.findMany({
    where,
    include: {
      template: true,
      createdBy: true,
      assignee: true,
    },
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Completed Requests</h1>
          <p className="text-gray-400">View and export completed service requests</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Filter by Date</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
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
                Completed By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Completion Date
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
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-safe" />
                    <span className="px-2 py-1 bg-safe/20 text-safe text-xs rounded-md font-medium">
                      COMPLETED
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.assignee ? (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-white">{request.assignee.email.split('@')[0]}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">System</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-400">
                    {new Date(request.updatedAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                    <Download className="w-3 h-3" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No completed requests yet</p>
          </div>
        )}
      </div>
    </div>
  )
}