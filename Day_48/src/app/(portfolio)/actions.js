'use server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export const handleSwitchMode = async () => {
  const path = headers().get('next-url')
  revalidatePath(path)
}
