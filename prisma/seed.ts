import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@thestartupzone.ae' },
    update: {},
    create: {
      email: 'admin@thestartupzone.ae',
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create Service Templates
  const licenseRenew = await prisma.serviceTemplate.upsert({
    where: { code: 'LIC-RENEW' },
    update: {},
    create: {
      code: 'LIC-RENEW',
      category: 'License',
      subCategory: 'Renewal',
      title: 'License Renewal',
      description: 'Renew your trade license',
      formSchema: {
        fields: [
          { name: 'licenseNumber', type: 'text', label: 'License Number', required: true },
          { name: 'expiryDate', type: 'date', label: 'Current Expiry Date', required: true },
          { name: 'activities', type: 'textarea', label: 'Business Activities', required: true },
        ]
      },
      requiredDocs: [
        'Current Trade License Copy',
        'Passport Copy',
        'Emirates ID Copy',
        'Tenancy Contract'
      ],
      slaDays: 3,
      isActive: true,
    },
  })

  const establishmentCard = await prisma.serviceTemplate.upsert({
    where: { code: 'EC-NEW' },
    update: {},
    create: {
      code: 'EC-NEW',
      category: 'Establishment Card',
      subCategory: 'New',
      title: 'New Establishment Card',
      description: 'Apply for a new establishment card',
      formSchema: {
        fields: [
          { name: 'companyName', type: 'text', label: 'Company Name', required: true },
          { name: 'licenseNumber', type: 'text', label: 'Trade License Number', required: true },
          { name: 'numberOfEmployees', type: 'number', label: 'Number of Employees', required: true },
          { name: 'officeAddress', type: 'textarea', label: 'Office Address', required: true },
        ]
      },
      requiredDocs: [
        'Trade License Copy',
        'Memorandum of Association',
        'Tenancy Contract',
        'Location Map'
      ],
      slaDays: 5,
      isActive: true,
    },
  })

  console.log('✅ Created service templates:', licenseRenew.code, establishmentCard.code)

  // Create sample staff user
  const staffPassword = await bcrypt.hash('Staff@123', 10)
  
  const staff = await prisma.user.upsert({
    where: { email: 'staff@thestartupzone.ae' },
    update: {},
    create: {
      email: 'staff@thestartupzone.ae',
      passwordHash: staffPassword,
      role: Role.STAFF,
    },
  })

  console.log('✅ Created staff user:', staff.email)

  // Create sample client user
  const clientPassword = await bcrypt.hash('Client@123', 10)
  
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      passwordHash: clientPassword,
      role: Role.CLIENT,
    },
  })

  console.log('✅ Created client user:', client.email)

  console.log('🌱 Seed completed!')
}