import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = nextAuth({
  providers: [
    CredentialsProvider({
      async authorize (credentials, req) {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            EmailAddress: credentials.EmailAddress,
            Password: credentials.Password
          }
          )
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signin`, options
        )
        const user = await res.json()

        const backResp = {
          message: user.message,
          error: user.error
        }

        if (user.error === true) throw backResp

        return user
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  }
})

export { handler as GET, handler as POST }
