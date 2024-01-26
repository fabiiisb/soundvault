import { NextResponse } from 'next/server'

import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware (Request) {
    const regex = /\/api\/*/

    if (regex.test(Request.url)) {
      console.log('Este mensaje deberia aparecer en cada ruta /api/*')
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null
    }
  }
)

export const config = {
  matcher: ['/test/:path*', '/private/:path*', '/api/private/:path*']
}
