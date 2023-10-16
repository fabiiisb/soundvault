import './globals.css'
import { Providers } from './providers'
import NavbarUi from '@/components/Navbar'

export const metadata = {
  title: 'Soundvault',
  description: 'Soundvault, the music app',
  colorScheme: 'dark'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-blackPurple dark text-foreground min-h-screen h-100% ">
        <Providers>
          <NavbarUi />
          <main
            className='relative max-w-[1024px] mx-auto px-6 py-8  z-10'
          >
            {children}
          </main>
        </Providers>
        <div className='circlePosition fixed w-[520px] h-[400px] bg-[#381c24] rounded-[100%] translate-x-[50%] blur-[90px] z-0 top-[-27%] left-[-20%] sm:left-[10%] md:left-[25%] lg:left-[40%] xl:left-[55%] 2xl:left-[70%] '></div>
        {/* <div className='circlePosition w-[520px] h-[400px] bg-[#1c1c38] rounded-[100%] fixed z-0 top-[30%] left-[-30%] translate-x-[50%] blur-[90px]'></div> */}
      </body>
    </html>

  )
}
