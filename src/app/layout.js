import './globals.css'
import { Providers } from './providers'
import NavbarUi from '@/components/Navbar.jsx'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer.jsx'

export const metadata = {
  title: 'Soundvault',
  description: 'Soundvault, the music app',
  themeColor: '#08040c'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className='bg-blackPurple dark text-foreground min-h-screen h-100%'>

      <body className='mb-[56px]'>
        <Providers>
          <NavbarUi />
          <main className='relative max-w-[1024px] mx-auto px-6 py-3 sm:py-7 z-10'>
            {children}
          </main>
          <MusicPlayer />
        </Providers>
        <div className='circlePosition fixed w-[520px] h-[400px] bg-bgBlur-950 rounded-[100%] translate-x-[50%] blur-[90px] z-0 top-[-27%] left-[-20%] sm:left-[10%] md:left-[25%] lg:left-[40%] xl:left-[55%] 2xl:left-[70%]'></div>

      </body>
    </html>

  )
}
