import { NextResponse } from 'next/server'
import { MOCK_INTENTS, MOCK_INFERRED_INTENTS, MOCK_ALIGNMENT } from '@/lib/mock/data'

export async function GET() {
  return NextResponse.json({
    declared: MOCK_INTENTS,
    inferred: MOCK_INFERRED_INTENTS,
    alignment: MOCK_ALIGNMENT,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ intent: { id: 'new-intent', ...body } })
}
