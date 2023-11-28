'use client'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import Link from 'next/link'

const ContactForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const [valUsername, setValUsername] = useState(false)
  const [valEmail, setValEmail] = useState(false)
  const [valFirstName, setValFirstName] = useState(false)
  const [valLastName, setValLastName] = useState(false)
  const [valPassword, setValPassword] = useState(false)
  const [valPasswordRep, setValPasswordRep] = useState(false)

  const [errorMsgPass, setErrorMsgPass] = useState('')
  const [errorMsgUser, setErrorMsgUser] = useState('')
  const [errorMsgEmail, setErrorMsgEmail] = useState('')

  const handleUsername = (ev) => {
    const newUsername = ev.target.value
    const usernameRegex = /^[a-zA-Z0-9]+$/
    setUsername(newUsername)

    if (newUsername !== '') {
      if (!usernameRegex.test(newUsername)) {
        setErrorMsgUser('Symbols or white spaces are not allowed')
        setValUsername(true)
      } else {
        setValUsername(false)
      }
    }
  }

  const handleEmail = (ev) => {
    const newEmail = ev.target.value
    setEmail(newEmail)

    if (newEmail !== '') {
      setValEmail(false)
    }
  }

  const handleFirstName = (ev) => {
    const newFirstName = ev.target.value
    setFirstName(newFirstName)

    if (newFirstName !== '') setValFirstName(false)
  }

  const handleLastName = (ev) => {
    const newLastName = ev.target.value
    setLastName(newLastName)

    if (newLastName !== '') setValLastName(false)
  }

  const handlePassword = (ev) => {
    const newPassword = ev.target.value
    setPassword(newPassword)

    if (newPassword !== '') setValPassword(false)
  }

  const handlePassword2 = (ev) => {
    const newPassword2 = ev.target.value
    setPasswordRepeat(newPassword2)

    if (newPassword2 !== '') setValPasswordRep(false)
  }

  const validEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

    if (email === '') {
      setErrorMsgEmail('Email cannot be empty')
      setValEmail(true)
      return false
    } else if (!emailRegex.test(email)) {
      setErrorMsgEmail('Invalid email addresses')
      setValEmail(true)
      return false
    } else {
      setValEmail(false)
      return true
    }
  }

  const validUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/

    if (username === '') {
      setErrorMsgUser('Username cannot be empty')
      setValUsername(true)
      return false
    } else if (!usernameRegex.test(username)) {
      setErrorMsgUser('Symbols or white spaces are not allowed')
      setValUsername(true)
      return false
    } else if (username.length < 4) {
      setErrorMsgUser('Your username must contain at least 4 characters')
      setValUsername(true)
    } else {
      setValUsername(false)
      return true
    }
  }

  const validFirstName = () => {
    if (firstName === '') {
      setValFirstName(true)
      return false
    } else {
      setValFirstName(false)
      return true
    }
  }

  const validLastName = () => {
    if (lastName === '') {
      setValLastName(true)
      return false
    } else {
      setValLastName(false)
      return true
    }
  }

  const matchPasswords = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/

    if (password === '' || passwordRepeat === '') {
      setValPassword(true)
      setValPasswordRep(true)
      setErrorMsgPass('Passwords can\'t be empty')
      return false
    } else if (password !== passwordRepeat) {
      setValPassword(true)
      setValPasswordRep(true)
      setErrorMsgPass('Passwords do not match')
      return false
    } else if (!passwordRegex.test(password)) {
      setValPassword(true)
      setValPasswordRep(true)
      setErrorMsgPass('Your password must contain at least 6 characters, including at least one letter and one digit')
      return false
    } else {
      setValPassword(false)
      setValPasswordRep(false)
      return true
    }
  }

  const submitForm = async (ev) => {
    ev.preventDefault()

    const isUsernameValid = validUsername()
    const isFirstNameValid = validFirstName()
    const isLastNameValid = validLastName()
    const isEmailValid = validEmail()
    const doPasswordsMatch = matchPasswords()

    if (isUsernameValid && isFirstNameValid && isLastNameValid && isEmailValid && doPasswordsMatch) {
      const usernameData = String(username.trim())
      const emailData = String(email.trim())
      const firstNameData = String(firstName.trim())
      const lastNameData = String(lastName.trim())
      const passwordData = String(password)

      const userArray = {
        username: usernameData,
        email: emailData,
        firstName: firstNameData,
        lastName: lastNameData,
        password: passwordData
      }

      console.log(userArray)
    }
    // } else {
    //   console.error('Invalid form')
    // }
  }

  return (
    <>
    <h1 className="text-xl font-bold inline-block mb-3">Sign up</h1>
    <form
      className='flex flex-col gap-4'
      onSubmit={submitForm}
    >
      <div className='flex flex-col gap-3'>
        <Input type='text' label="Username" placeholder="Enter your username" size='sm' value={username} autocomplete="off"
          color={valUsername ? 'danger' : ''}
          isInvalid={valUsername}
          errorMessage={valUsername && errorMsgUser}
          onChange={handleUsername}
        />

        <Input type='email' label="Email" placeholder="Enter your email" size='sm' value={email} autocomplete="off"
          isInvalid={valEmail}
          color={valEmail ? 'danger' : ''}
          errorMessage={valEmail && errorMsgEmail}
          onChange={handleEmail}
        />

        <Input type='text' label="First name" placeholder="Enter your first name" size='sm' value={firstName}
          color={valFirstName ? 'danger' : ''}
          isInvalid={valFirstName}
          errorMessage={valFirstName && 'First name cannot be empty'}
          onChange={handleFirstName}
        />

        <Input type='text' label="Last name" placeholder="Enter your last name" size='sm' value={lastName}
          isInvalid={valLastName}
          errorMessage={valLastName && 'Last name cannot be empty'}
          color={valLastName ? 'danger' : ''}
          onChange={handleLastName}
        />

        <Input type="password" label="Password" placeholder="Enter your password" size='sm' value={password}
          errorMessage={valPassword && errorMsgPass}
          color={valPassword ? 'danger' : ''}
          onChange={handlePassword}
        />

        <Input type="password" label="Confirm Password" placeholder="Repeat your password" size='sm' value={passwordRepeat}
          errorMessage={valPasswordRep && errorMsgPass}
          color={valPasswordRep ? 'danger' : ''}
          onChange={handlePassword2}
        />
      </div>
      <div className='flex gap-2 text-tiny text-niceOrange-400 justify-end'>
        <Link
          className='no-underline hover:underline'
          href="/auth/login">
          {'Do you have an account? '}
          <span
            className='font-semibold'
          >
            Login!
          </span>
        </Link>
      </div>
      <div className='flex justify-end'>
        <Button as={'button'} type="submit" className='font-semibold'>Sign Up</Button>
      </div>
    </form>
  </>
  )
}

export default ContactForm
