'use server'
import { revalidatePath } from 'next/cache'

export const handleSwitchMode = async (path) => {

  revalidatePath(path)
}
