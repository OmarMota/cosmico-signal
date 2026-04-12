import { type NextRequest, NextResponse } from 'next/server'

// Prototype mode: no auth, pass everything through
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
