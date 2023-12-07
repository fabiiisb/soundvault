import { Input, Button } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [valEmail, setValEmail] = useState(false)
  const [valPass, setValPass] = useState(false)
  const [errorMsgEmail, setErrorMsgEmail] = useState('')
  const [errorMsgPass, setErrorMsgPass] = useState('')

  const handleValEmail = (ev) => {
    setEmail(ev.target.value)
    setValEmail(false)
  }

  const handleValPass = (ev) => {
    setPassword(ev.target.value)
    setValPass(false)
  }

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

    if (email === '') {
      setErrorMsgEmail('Email cannot be empty')
      setValEmail(true)
      return false
    } else if (!emailRegex.test(email)) {
      setErrorMsgEmail('Invalid email addresses')
      setValEmail(true)
    } else {
      setErrorMsgEmail('')
      return true
    }
  }

  const validatePassword = () => {
    if (password === '') {
      setErrorMsgPass('Your password cannot be empty')
      setValPass(true)
      return false
    } else if (password.length < 6) {
      setErrorMsgPass('Your password must contain at least 6 characters')
      setValPass(true)
      return false
    } else {
      setErrorMsgPass('')
      return true
    }
  }

  const submitForm = (ev) => {
    ev.preventDefault()

    const isValidEmail = validateEmail()
    const isValidPassword = validatePassword()

    if (isValidEmail && isValidPassword) {
      const emailData = email
      const passwordData = password

      const loginArray = {
        EmailAddress: emailData,
        Password: passwordData
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginArray)
      }

      fetch('http://localhost:3000/api/auth/signin', options)
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            const msgError = res.message
            return console.log(msgError)
          } else if (res.validationError) {
            console.log(res.validationError)
            throw new Error('Validation error')
          }

          console.log(res.message)
        })
        .catch(err => {
          if (err.message === 'Validation error') {
            console.log('error de validacion manin')
          } else {
            console.log('error inesperado manin')
          }
        })
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold inline-block mb-3">Login</h1>
      <form
        className='flex flex-col gap-5'
        onSubmit={submitForm}
      >
        <div className='flex flex-col gap-3'>
          <Input label="Email" placeholder="Enter your email" size='sm'
            value={email}
            onChange={handleValEmail}
            color={valEmail ? 'danger' : ''}
            isInvalid={valEmail}
            errorMessage={valEmail && errorMsgEmail}
          />

          <Input type="password" label="Password" placeholder="Enter your password" size='sm'
            value={password}
            onChange={handleValPass}
            color={valPass ? 'danger' : ''}
            isInvalid={valPass}
            errorMessage={valPass && errorMsgPass}
          />
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
          <Button
             className={'font-semibold bg-bgBlur-900/80 hover:bg-bgBlur-800'}
            as={'button'}
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </div>
      </form>
    </>
  )
}

export default SignInForm
