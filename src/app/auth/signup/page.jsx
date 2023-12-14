import SignUpForm from '@/components/Forms/SignUp/SignUpForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const SignUpPage = async () => {
  const session = await getServerSession()

  if (session) {
    redirect('/')
  }

  return <SignUpForm />
}

export default SignUpPage
