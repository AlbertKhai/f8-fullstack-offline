import { cookies } from 'next/headers'

export const getTheme = () => {
  const cookieStore = cookies()
  return cookieStore.get('lightMode')?.value === 'true'
}

export const getLang = () => {
  const cookieStore = cookies()
  return cookieStore.get('language')?.value || 'en'
}
