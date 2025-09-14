import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { TopBar } from '@/components/layout/topbar'
import { Sidebar } from '@/components/layout/sidebar'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#111]">
      <TopBar user={session.user} />
      <div className="flex">
        <Sidebar role={session.user.role} />
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}