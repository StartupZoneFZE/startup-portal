# 🚀 Vercel Database Setup

## Quick Database Setup (2 minutes)

### Option 1: Use Neon (Recommended - Free)

1. **Go to Neon**: https://neon.tech
2. **Sign up with GitHub**
3. **Create Database**:
   - Project name: `startup-portal`
   - Region: `US East` (or nearest)
   - Database name: `startup_portal`
4. **Copy connection string** from dashboard

### Option 2: Use Vercel Postgres

1. **Go to**: https://vercel.com/startup-zone-fze-s-projects/startup-portal/stores
2. **Click "Create Database"**
3. **Select "Postgres"**
4. **Create & Connect**

## Add to Vercel Environment Variables

1. **Go to**: https://vercel.com/startup-zone-fze-s-projects/startup-portal/settings/environment-variables

2. **Add these variables**:

```
DATABASE_URL=[your-postgres-connection-string]
DATABASE_URL_UNPOOLED=[same-connection-string]
NEXTAUTH_URL=https://startup-portal-beta.vercel.app
NEXTAUTH_SECRET=6aIDdeWZvEuHaLGm8JPaFVkJL9veUm1JTRun38E3jgU
```

3. **Click "Save"**

4. **Redeploy**:
   - Go to Deployments tab
   - Click "..." → "Redeploy"
   - Use existing build cache

## After Database is Connected

Run these commands locally:
```bash
# Pull new env vars
cd startup-portal
npx vercel env pull .env.local --yes

# Push schema
npx prisma db push

# Seed data
npm run db:seed
```

Your app will then work with full database functionality!