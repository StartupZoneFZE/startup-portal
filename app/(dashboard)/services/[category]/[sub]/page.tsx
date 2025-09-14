import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ChevronRight, ArrowRight, Clock, FileText } from 'lucide-react'

const prisma = new PrismaClient()

export default async function SubCategoryPage({
  params
}: {
  params: { category: string; sub: string }
}) {
  const category = decodeURIComponent(params.category)
  const subCategory = decodeURIComponent(params.sub)
  
  // Get services for this subcategory
  const services = await prisma.serviceTemplate.findMany({
    where: { 
      isActive: true,
      category: {
        equals: category,
        mode: 'insensitive'
      },
      subCategory: {
        equals: subCategory,
        mode: 'insensitive'
      }
    },
  })

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
        <Link href="/services" className="hover:text-brand transition-colors">
          Services
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link 
          href={`/services/${encodeURIComponent(category.toLowerCase())}`}
          className="hover:text-brand transition-colors capitalize"
        >
          {category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white capitalize">{subCategory}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 capitalize">
          {category} - {subCategory}
        </h1>
        <p className="text-gray-400">Select a service to start your application</p>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <FileText className="w-6 h-6 text-brand" />
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <span className="px-2 py-1 bg-brand/20 text-brand text-xs rounded-md font-medium">
                    {service.code}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{service.description}</p>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>SLA: {service.slaDays} days</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>{(service.requiredDocs as string[]).length} documents required</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/sr/new?code=${service.code}`}
                className="flex items-center space-x-2 px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded-lg transition-colors"
              >
                <span>Start Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}