import { redirect } from 'next/navigation'

export async function GET(request) {
  const urlPortfolio = `${request.nextUrl.origin}/home`
  redirect(urlPortfolio)
}
