import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    service: 'startup-portal',
    version: '0.1.0'
  })
}