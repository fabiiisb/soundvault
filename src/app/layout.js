import './globals.css'

export const metadata = {
  title: 'Soundvault',
  description: 'Soundvault, the music app'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  )
}
