import { NextResponse } from 'next/server'
import { MOCK_SIGNAL_PROFILE } from '@/lib/mock/data'

export async function GET() {
  return NextResponse.json({ profile: MOCK_SIGNAL_PROFILE })
}

export async function POST() {
  return NextResponse.json({ success: true })
}
