'use client'
import { Input, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (ev) => {
    ev.preventDefault()
    if (email && password) console.log(email, password)
  }

  return (
    <>
      <h1 className="text-xl font-bold inline-block mb-3">Login</h1>
      <form
        className='flex flex-col gap-4'
        onSubmit={submitForm}
      >
        <div className='flex flex-col gap-3'>
          <Input type='email' label="Email" placeholder="Enter your email" size='sm' value={email} onChange={ev => setEmail(ev.target.value)} />
          <Input type="password" label="Password" placeholder="Enter your password" size='sm' value={password} onChange={ev => setPassword(ev.target.value)} />
        </div>
        <div className='flex gap-2 text-tiny text-niceOrange-400 justify-between'>
          <Link
            className='no-underline hover:underline'
            href="/">
            Password forgotten?
          </Link>

          <Link
            className='no-underline hover:underline'
            href="/auth/signup">
            {'Don\'t have an account? '}
            <span
              className='font-semibold'
            >
              Sign Up!
            </span>
          </Link>
        </div>
        <div className='flex justify-end'>
          <Button as={'button'} type="submit" className='font-semibold'>Login</Button>
        </div>
      </form>
    </>
  )
}

export default LoginPage
