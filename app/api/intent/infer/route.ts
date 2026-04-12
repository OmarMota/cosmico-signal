import { NextResponse } from 'next/server'
import { MOCK_INFERRED_INTENTS } from '@/lib/mock/data'

export async function POST() {
  return NextResponse.json({ inferred: MOCK_INFERRED_INTENTS })
}
