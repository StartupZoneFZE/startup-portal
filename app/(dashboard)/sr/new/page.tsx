import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export default async function NewServiceRequestPage({
  searchParams
}: {
  searchParams: { code?: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const templateCode = searchParams.code

  if (!templateCode) {
    redirect('/services')
  }

  // Get the template
  const template = await prisma.serviceTemplate.findUnique({
    where: { code: templateCode }
  })

  if (!template) {
    redirect('/services')
  }

  // Create a draft service request
  const serviceRequest = await prisma.serviceRequest.create({
    data: {
      templateId: template.id,
      status: 'DRAFT',
      createdById: session.user.id,
      companyName: 'TBD', // Will be updated when company model is added
    }
  })

  // Redirect to the SR details page (or form page when implemented)
  redirect(`/sr/in-progress`)
}