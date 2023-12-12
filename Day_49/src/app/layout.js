export const metadata = {
  title: 'Day-49',
  description: 'Day-49 Shop Next JS'
}

export default function RootLayout({ children }) {
  return (
    <html lang='vi'>
      <head>
        <link rel='preconnect' href='https://site-assets.fontawesome.com' />
        <link rel='preconnect' href='https://use.fortawesome.com' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-solid.css' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css' />
        <link rel='stylesheet' href='https://use.fortawesome.com/kits/1ce05b4b/publications/124411/woff2.css' media='all' />
      </head>
      <body>{children}</body>
    </html>
  )
}
