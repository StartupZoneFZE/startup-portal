import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Initialize S3 client (stubbed for now)
const s3Client = new S3Client({
  region: process.env.S3_REGION || 'me-central-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || 'stub-key',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'stub-secret',
  },
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { srId, docType, fileName } = await request.json()

    if (!srId || !docType || !fileName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate S3 key pattern
    const timestamp = Date.now()
    const key = `companies/unknown/sr/${srId}/${docType}/${timestamp}__v1__${fileName}`

    // Create presigned URL (stubbed for development)
    if (process.env.NODE_ENV === 'development' || !process.env.S3_ACCESS_KEY_ID) {
      // Return stub URL for development
      return NextResponse.json({
        uploadUrl: `https://stub-s3-bucket.s3.me-central-1.amazonaws.com/${key}`,
        key,
        expiresIn: 3600,
        message: 'Stub presigned URL for development'
      })
    }

    // Production: Generate real presigned URL
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET || 'startup-zone-docs',
      Key: key,
      ContentType: 'application/octet-stream',
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    return NextResponse.json({
      uploadUrl,
      key,
      expiresIn: 3600
    })
  } catch (error) {
    console.error('Presign error:', error)
    return NextResponse.json(
      { error: 'Failed to generate presigned URL' },
      { status: 500 }
    )
  }
}