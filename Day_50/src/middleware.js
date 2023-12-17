import { NextResponse } from 'next/server'

export const middleware = (request) => {
  const pathname = request.nextUrl.pathname

  const getLightMode = () => request.cookies.get('lightMode')
  const getLang = () => request.cookies.get('language')

  if (!getLightMode()) {
    request.cookies.set('lightMode', 'false')
  }

  if (!getLang()) {
    request.cookies.set('language', 'en')
  }

  let response = NextResponse.next()

  if (pathname === '/') {
    const url = new URL(`/${getLang().value}`, request.url)
    response = NextResponse.redirect(url)
  }

  response.headers.set('x-pathname', pathname)
  response.cookies.set('lightMode', getLightMode().value)
  response.cookies.set('language', getLang().value)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
