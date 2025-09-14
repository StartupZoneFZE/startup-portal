import { CircularProgress } from '@/components/ui/circular-progress'
import { Building2, Calendar, Package, AlertCircle } from 'lucide-react'

// Dummy data for now (will be replaced with real data later)
const dummyCompanies = [
  {
    id: '1',
    name: 'Tech Innovators FZ-LLC',
    package: 'Premium',
    licenseNo: 'TL-2024-0123',
    establishmentDate: '2024-01-15',
    expiryDate: '2025-01-14',
    daysRemaining: 90,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Global Consulting Group',
    package: 'Standard',
    licenseNo: 'TL-2023-0456',
    establishmentDate: '2023-06-01',
    expiryDate: '2024-05-31',
    daysRemaining: 45,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Digital Solutions DMCC',
    package: 'Enterprise',
    licenseNo: 'TL-2023-0789',
    establishmentDate: '2023-03-10',
    expiryDate: '2024-03-09',
    daysRemaining: 15,
    status: 'Expiring Soon'
  },
  {
    id: '4',
    name: 'Creative Agency FZE',
    package: 'Startup',
    licenseNo: 'TL-2024-0234',
    establishmentDate: '2024-02-20',
    expiryDate: '2025-02-19',
    daysRemaining: 120,
    status: 'Active'
  },
  {
    id: '5',
    name: 'Export Import LLC',
    package: 'Standard',
    licenseNo: 'TL-2022-0567',
    establishmentDate: '2022-09-15',
    expiryDate: '2023-09-14',
    daysRemaining: -90,
    status: 'Expired'
  }
]

function calculateProgress(daysRemaining: number): number {
  const totalDays = 365
  if (daysRemaining < 0) return 0
  if (daysRemaining > totalDays) return 100
  return Math.round((daysRemaining / totalDays) * 100)
}

export default function CompaniesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Registered Companies</h1>
        <p className="text-gray-400">Manage and monitor company registrations</p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                License No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Establishment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dummyCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5 text-brand" />
                    <span className="text-sm font-medium text-white">{company.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">{company.package}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-300">{company.licenseNo}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {new Date(company.establishmentDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <CircularProgress 
                      value={calculateProgress(company.daysRemaining)} 
                      size={36}
                      strokeWidth={3}
                    />
                    <div>
                      <p className="text-sm text-white">
                        {new Date(company.expiryDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {company.daysRemaining > 0 
                          ? `${company.daysRemaining} days left`
                          : company.daysRemaining === 0
                          ? 'Expires today'
                          : `Expired ${Math.abs(company.daysRemaining)} days ago`
                        }
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    px-2 py-1 text-xs rounded-md font-medium flex items-center space-x-1 w-fit
                    ${company.status === 'Active' ? 'bg-safe/20 text-safe' : ''}
                    ${company.status === 'Expiring Soon' ? 'bg-warn/20 text-warn' : ''}
                    ${company.status === 'Expired' ? 'bg-danger/20 text-danger' : ''}
                  `}>
                    {company.status === 'Expiring Soon' && <AlertCircle className="w-3 h-3" />}
                    <span>{company.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}