import { NextResponse } from 'next/server'
import { MOCK_RECOMMENDATIONS } from '@/lib/mock/data'

export async function GET() {
  return NextResponse.json({ recommendations: MOCK_RECOMMENDATIONS })
}
