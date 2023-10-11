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
        className="bg-blackPurple dark text-foreground min-h-screen h-100% ">
        <Providers>
          <NavbarUi />
          <main
            className='max-w-[1024px] mx-auto px-6 py-2 relative z-10'
          >
            {children}
          </main>
        </Providers>
        <div className='circlePosition w-[520px] h-[400px] bg-[#381c24] rounded-[100%] fixed z-0 top-[-20%] left-[60%] translate-x-[50%] blur-[90px]'></div>
      </body>
    </html>

  )
}
