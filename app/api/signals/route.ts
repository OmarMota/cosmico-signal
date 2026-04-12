import { NextResponse } from 'next/server'
import { MOCK_WEEKLY_HISTORY } from '@/lib/mock/data'

export async function GET() {
  return NextResponse.json({ aggregates: MOCK_WEEKLY_HISTORY })
}

export async function POST() {
  return NextResponse.json({ event: { id: 'mock-event', recorded_at: new Date().toISOString() } })
}
