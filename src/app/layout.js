import './globals.css'
import { Providers } from './providers'
import NavbarUi from '@/components/Navbar'

export const metadata = {
  title: 'Soundvault',
  description: 'Soundvault, the music app'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-background dark text-foreground h-screen w-screen">
        <Providers>
          <NavbarUi />
          <main
            className='max-w-[1024px] mx-auto px-6'
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>

  )
}
