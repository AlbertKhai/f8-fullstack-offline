// Styles
import '@scss/styles.scss'

// fontawesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

// auth0
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Providers from '@/redux/Providers'

export const metadata = {
  title: 'Mindmap Flow',
  description: 'Project Front-end',
  icons: {
    icon: '/icon.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang='vi'>
      <Providers>
        <UserProvider>
          <body>{children}</body>
        </UserProvider>
      </Providers>
    </html>
  )
}
