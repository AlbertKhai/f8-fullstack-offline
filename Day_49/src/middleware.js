import { NextResponse } from 'next/server'

export const middleware = (request) => {
  const response = NextResponse.next()
  const hasCookieLightMode = request.cookies.get('lightMode')

  if (hasCookieLightMode === undefined) {
    response.cookies.set({
      name: 'lightMode',
      value: 'true'
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
