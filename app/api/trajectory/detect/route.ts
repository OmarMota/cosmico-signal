import { NextResponse } from 'next/server'
import { MOCK_TRAJECTORY } from '@/lib/mock/data'

export async function POST() {
  return NextResponse.json({ snapshot: MOCK_TRAJECTORY })
}
