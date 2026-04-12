import { NextResponse } from 'next/server'
import { MOCK_PROFILE, MOCK_SKILLS } from '@/lib/mock/data'

export async function GET() {
  return NextResponse.json({ profile: MOCK_PROFILE, skills: MOCK_SKILLS })
}

export async function PATCH(request: Request) {
  const updates = await request.json()
  return NextResponse.json({ profile: { ...MOCK_PROFILE, ...updates } })
}
