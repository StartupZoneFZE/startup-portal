import Link from 'next/link'
import { ChevronRight, Package } from 'lucide-react'

export default async function ServicesPage() {
  // Mock data for now - will be replaced with database query
  const categories = ['License', 'Establishment Card', 'Immigration', 'Corporate Services']
  
  // Once database is connected, uncomment this:
  // const prisma = new PrismaClient()
  // const templates = await prisma.serviceTemplate.findMany({
  //   where: { isActive: true },
  //   select: { category: true },
  //   distinct: ['category'],
  // })
  // const categories = templates.map(t => t.category)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Service Catalog</h1>
        <p className="text-gray-400">Browse and start applications for business services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/services/${encodeURIComponent(category.toLowerCase())}`}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-brand" />
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
            <p className="text-sm text-gray-400">
              View all {category.toLowerCase()} related services
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}