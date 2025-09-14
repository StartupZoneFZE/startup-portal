import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ChevronRight, FileText } from 'lucide-react'

const prisma = new PrismaClient()

export default async function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  const category = decodeURIComponent(params.category)
  
  // Get distinct subcategories for this category
  const templates = await prisma.serviceTemplate.findMany({
    where: { 
      isActive: true,
      category: {
        equals: category,
        mode: 'insensitive'
      }
    },
    select: { subCategory: true },
    distinct: ['subCategory'],
  })

  const subCategories = templates.map(t => t.subCategory)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
        <Link href="/services" className="hover:text-brand transition-colors">
          Services
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white capitalize">{category}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 capitalize">{category} Services</h1>
        <p className="text-gray-400">Select a service category to continue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory}
            href={`/services/${encodeURIComponent(category.toLowerCase())}/${encodeURIComponent(subCategory.toLowerCase())}`}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-10 h-10 text-brand" />
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{subCategory}</h3>
            <p className="text-sm text-gray-400">
              {category} - {subCategory} services
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}