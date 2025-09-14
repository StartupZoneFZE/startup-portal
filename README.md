# Startup Zone Portal

A modern business management portal built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database
- npm or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd startup-portal
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

4. **Set up the database**
```bash
# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

5. **Start development server**
```bash
npm run dev
```

Visit http://localhost:3000

## 🔑 Default Credentials

- **Admin**: admin@thestartupzone.ae / Admin@123
- **Staff**: staff@thestartupzone.ae / Staff@123
- **Client**: client@example.com / Client@123

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Styling**: Tailwind CSS 4
- **File Storage**: AWS S3 (me-central-1)
- **Email**: Resend (stubbed)
- **Monitoring**: Sentry

## 🏗️ Project Structure

```
startup-portal/
├── app/
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── companies/    # Company management
│   │   ├── dashboard/    # Main dashboard
│   │   ├── services/     # Service catalog
│   │   └── sr/          # Service requests
│   ├── api/             # API routes
│   │   ├── auth/        # NextAuth endpoints
│   │   ├── health/      # Health check
│   │   └── uploads/     # File upload presigning
│   └── login/           # Public login page
├── components/
│   ├── layout/          # Layout components (TopBar, Sidebar)
│   └── ui/              # Reusable UI components
├── lib/                 # Utilities and configs
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts         # Seed script
└── public/             # Static assets
```

## 🔧 Scripts

```bash
# Development
npm run dev           # Start dev server
npm run dev:up        # Start dev server (alias)

# Build & Deploy
npm run build         # Production build
npm run build:ci      # CI build (lint + typecheck + build)
npm run start         # Start production server

# Database
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:migrate    # Run migrations
npm run db:seed       # Seed database

# Quality
npm run lint          # Run ESLint
npm run typecheck     # TypeScript type checking
```

## 🌐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AWS S3
S3_REGION="me-central-1"
S3_BUCKET="your-bucket"
S3_ACCESS_KEY_ID="your-key"
S3_SECRET_ACCESS_KEY="your-secret"

# Resend (Email)
RESEND_API_KEY="re_xxxxx"
RESEND_FROM_EMAIL="noreply@domain.com"

# Sentry
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

1. Build the project
```bash
npm run build
```

2. Set production environment variables
3. Start the server
```bash
npm start
```

## ✅ Features

- **Service Catalog**: Browse and apply for business services
- **Service Requests**: Track in-progress and completed requests
- **Company Management**: Monitor registered companies
- **Role-Based Access**: Admin, Staff, and Client roles
- **Document Management**: S3 integration for file uploads
- **Real-time Status**: Track application progress
- **Responsive Design**: Works on all devices

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Secure password hashing with bcrypt
- Environment variable protection
- SQL injection prevention with Prisma

## 📈 Monitoring

- Health check endpoint: `/api/health`
- Sentry error tracking
- Structured logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License

## 🆘 Support

For issues and questions, please open a GitHub issue.