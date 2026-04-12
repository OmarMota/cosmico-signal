import { NextResponse } from 'next/server'
import { MOCK_TRAJECTORY, MOCK_MILESTONES } from '@/lib/mock/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('history') === 'true') {
    return NextResponse.json({ snapshots: [MOCK_TRAJECTORY] })
  }
  return NextResponse.json({ snapshot: MOCK_TRAJECTORY, milestones: MOCK_MILESTONES })
}
