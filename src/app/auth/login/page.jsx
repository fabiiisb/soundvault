import SignInForm from '@/components/Forms/SignIn/SignInForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const session = await getServerSession()

  if (session) {
    redirect('/')
  }

  return <SignInForm />
}

export default LoginPage
