import { redirect } from 'next/navigation'
import { getLang } from '@/utils/getCookie'

export async function GET(request) {
  const language = getLang()
  const urlPortfolio = `${request.nextUrl.origin}/${language}`
  redirect(urlPortfolio)
}
