import './globals.css'
import { Providers } from './providers'
import NavbarUi from '@/components/Navbar'
import MusicNav from '@/components/Player/PlayerNav'
import PlayerCompo from '@/context/MusicPlayer/PlayerCompo'

export const metadata = {
  title: 'Soundvault',
  description: 'Soundvault, the music app',
  themeColor: '#08040c'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className='bg-blackPurple-950 dark text-foreground min-h-screen h-100%'>
      <body >
        <Providers>
          <PlayerCompo>
            <NavbarUi />
            <main
              className='relative max-w-[1024px] mx-auto mb-[96px] sm:mb-[56px] px-6 py-5 z-10 '
            >
              {children}
            </main>
            <MusicNav />
          </PlayerCompo>
        </Providers>
      </body>
    </html>

  )
}
