import { NextResponse } from 'next/server'
import { MOCK_OPPORTUNITIES } from '@/lib/mock/data'

export async function GET() {
  const sorted = [...MOCK_OPPORTUNITIES].sort(
    (a, b) => (b.fit?.fit_score ?? 0) - (a.fit?.fit_score ?? 0)
  )
  return NextResponse.json({ opportunities: sorted })
}
