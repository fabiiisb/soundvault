import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
}

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
        const response = await res.json()
        const user = response.data

        const backResp = {
          message: response.message,
          error: response.error
        }

        if (response.error === true) throw backResp

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.image
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  }
})

export { handler as GET, handler as POST }
