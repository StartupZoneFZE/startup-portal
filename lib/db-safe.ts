import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Create a safe Prisma instance that doesn't fail during build
export const prisma = global.prisma || (() => {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, using mock database for build')
    // Return a mock for build time only
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return null as any
    }
  }
  
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  
  return client
})()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma