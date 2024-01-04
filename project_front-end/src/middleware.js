// middleware.js
import { getSession } from '@auth0/nextjs-auth0/edge'
import { NextResponse } from 'next/server'

export const middleware = async (req) => {
  const pathname = req.nextUrl.pathname

  const setHeaders = (res, key, value) => {
    res.headers.set(key, value)
  }

  const setCookies = (res, key, value) => {
    res.cookies.set(key, value)
  }

  const response = ({ path, headers, cookies }) => {
    const res = path ? NextResponse.redirect(new URL(path, req.url)) : NextResponse.next()
    headers.forEach(({ name, value }) => {
      setHeaders(res, name, value)
    })

    cookies &&
      cookies.forEach(({ name, value }) => {
        setCookies(res, name, value)
      })

    return res
  }

  const user = await getSession(req, NextResponse.next())

  const dataRes = {
    path: null,
    headers: [{ name: 'x-pathname', value: pathname }],
    cookies: null
  }

  if (pathname.startsWith('/mindmap/share/')) return response(dataRes)
  if (pathname.startsWith('/mindmap') && !user) return response({ ...dataRes, path: '/api/auth/login' })
  if (pathname.startsWith('/api/auth/login') && !!user) return response({ ...dataRes, path: '/' })

  return response(dataRes)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
