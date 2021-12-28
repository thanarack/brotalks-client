import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // return new Response('Hello, world!')
  return NextResponse.next()
}
