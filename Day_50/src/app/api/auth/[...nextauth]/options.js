import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB
    }),
    GoogleProvider({
      clientId: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const providersLoggedBefore = cookies().get('providersLogged')?.value
      const newProvidersLogged = account.provider + (providersLoggedBefore ? `/${providersLoggedBefore}` : '')
      cookies().set(`providersLogged`, newProvidersLogged)
      return true
    }
  }
}
