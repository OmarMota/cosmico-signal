import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ step: 6, complete: true })
}

export async function POST(request: Request) {
  const { step } = await request.json()
  if (step >= 5) return NextResponse.json({ complete: true })
  return NextResponse.json({ success: true, next_step: step + 1 })
}
