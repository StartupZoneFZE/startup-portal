# 🚀 Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `startup-portal`
3. Set it to **Public** or **Private** as needed
4. **DO NOT** initialize with README, .gitignore, or license

## Step 2: Push Code to GitHub

After creating the empty repository on GitHub, run these commands:

```bash
# We've already initialized git and made the first commit
# Just add the remote and push

git remote remove origin  # Remove the incorrect remote
git remote add origin https://github.com/[YOUR-USERNAME]/startup-portal.git
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:

```env
# Database (use Neon, Supabase, or any PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# NextAuth
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# AWS S3 (Optional - stubbed for now)
S3_REGION=me-central-1
S3_BUCKET=your-bucket
S3_ACCESS_KEY_ID=your-key
S3_SECRET_ACCESS_KEY=your-secret

# Resend (Optional - for emails)
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

5. Click "Deploy"

## Step 4: Set Up Database

After deployment, run these commands locally or in Vercel's terminal:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Push schema to production database
npx prisma db push

# Seed initial data
npm run db:seed
```

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Check health endpoint: `https://your-app.vercel.app/api/health`
3. Login with seeded credentials:
   - Admin: admin@thestartupzone.ae / Admin@123
   - Staff: staff@thestartupzone.ae / Staff@123
   - Client: client@example.com / Client@123

## 🎉 Success Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Database schema pushed
- [ ] Database seeded
- [ ] Health check working
- [ ] Login working
- [ ] Dashboard accessible

## 📝 Notes

- The project uses PostgreSQL - you'll need a database provider
- Recommended: [Neon](https://neon.tech) or [Supabase](https://supabase.com) for free PostgreSQL
- S3 integration is stubbed - works without AWS credentials
- Email sending is optional - works without Resend

## 🆘 Troubleshooting

### Build Errors
- Check all environment variables are set
- Ensure DATABASE_URL is valid
- Run `npm install` locally and test build

### Database Connection
- Verify DATABASE_URL format
- Check database is accessible
- Ensure SSL is configured if required

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again