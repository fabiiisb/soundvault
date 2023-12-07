'use client'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import Link from 'next/link'
import Alert from '@/components/Alerts/Alert'

const SignUpForm = () => {
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
  const [errorMsgFirstName, setErrorMsgFirstName] = useState('')
  const [errorMsgLastName, setErrorMsgLastName] = useState('')

  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const [boolErrDb, setBoolErrDb] = useState(false)

  const handleUsername = (ev) => {
    const newUsername = ev.target.value
    const usernameRegex = /^[a-zA-Z0-9]+$/

    if (newUsername.length > 20) {
      const truncatedInput = newUsername.slice(0, 20)
      setUsername(truncatedInput)
    } else {
      setUsername(newUsername)
    }

    if (newUsername !== '') {
      if (!usernameRegex.test(newUsername)) {
        setErrorMsgUser('Symbols or white spaces are not allowed')
        setValUsername(true)
      } else {
        setValUsername(false)
      }
    }

    setBoolErrDb(false)
  }

  const handleEmail = (ev) => {
    const newEmail = ev.target.value

    if (newEmail.length > 50) {
      const truncatedInput = newEmail.slice(0, 50)
      setEmail(truncatedInput)
    } else {
      setEmail(newEmail)
    }

    if (newEmail !== '') setValEmail(false)

    setBoolErrDb(false)
  }

  const handleFirstName = (ev) => {
    const newFirstName = ev.target.value

    if (newFirstName.length > 50) {
      const truncatedInput = newFirstName.slice(0, 50)
      setFirstName(truncatedInput)
    } else {
      setFirstName(newFirstName)
    }

    if (newFirstName !== '') setValFirstName(false)
  }

  const handleLastName = (ev) => {
    const newLastName = ev.target.value

    if (newLastName.length > 50) {
      const truncatedInput = newLastName.slice(0, 50)
      setLastName(truncatedInput)
    } else {
      setLastName(newLastName)
    }

    if (newLastName !== '') setValLastName(false)
  }

  const handlePassword = (ev) => {
    const newPassword = ev.target.value
    if (newPassword.length > 100) {
      const truncatedInput = newPassword.slice(0, 100)
      setPassword(truncatedInput)
    } else {
      setPassword(newPassword)
    }

    if (newPassword !== '') setValPassword(false)
  }

  const handlePassword2 = (ev) => {
    const newPassword2 = ev.target.value

    if (newPassword2.length > 100) {
      const truncatedInput = newPassword2.slice(0, 100)
      setPasswordRepeat(truncatedInput)
    } else {
      setPasswordRepeat(newPassword2)
    }

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
    } else if (boolErrDb === true) {
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
    } else if (boolErrDb === true) {
      return false
    } else {
      setValUsername(false)
      return true
    }
  }

  const validFirstName = () => {
    if (firstName === '') {
      setErrorMsgFirstName('First name cannot be empty')
      setValFirstName(true)
      return false
    } else if (firstName.length < 3) {
      setErrorMsgFirstName('Your first name must contain at least 3 characters')
      setValFirstName(true)
      return false
    } else {
      setValFirstName(false)
      return true
    }
  }

  const validLastName = () => {
    if (lastName === '') {
      setErrorMsgLastName('Last name cannot be empty')
      setValLastName(true)
      return false
    } else if (lastName.length < 3) {
      setErrorMsgLastName('Your last name must contain at least 3 characters')
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

  const dbErrors = (error) => {
    if (error.includes('Username and email address already exist.')) {
      setErrorMsgEmail('Email address already exist.')
      setValEmail(true)

      setErrorMsgUser('Username already exist.')
      setValUsername(true)
    } else if (error.includes('Username already exists.')) {
      setErrorMsgUser('Username already exist.')
      setValUsername(true)
    } else if (error.includes('Email address already exists.')) {
      setErrorMsgEmail('Email address already exist.')
      setValEmail(true)
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
        Username: usernameData,
        EmailAddress: emailData,
        Password: passwordData,
        FirstName: firstNameData,
        LastName: lastNameData
      }

      setAlert(false)
      setIsLoadingBtn(true)

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userArray)
      }

      fetch('http://localhost:3000/api/auth/signup', options)
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            if (res.validationError) {
              console.log(res.validationError)
              throw new Error('Validation error')
            } else {
              const msgError = res.message
              dbErrors(msgError)
              setBoolErrDb(true)
              return setIsLoadingBtn(false)
            }
          } else {
            console.log(res.message)
            setIsLoadingBtn(false)
          }
        })
        .catch(err => {
          if (err.message === 'Validation error') {
            setAlertMsg('Validation error')
            setAlert(true)
          } else {
            setAlertMsg('Unexpected error')
            setAlert(true)
          }
          setIsLoadingBtn(false)
        })
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold inline-block mb-3">Sign up</h1>
      <form
        className='flex flex-col gap-5'
        onSubmit={submitForm}
      >
        <div className='flex flex-col gap-3'>
          <Input type='text' label="Username" placeholder="Enter your username" size='sm' value={username} autocomplete="off"
            color={valUsername ? 'danger' : ''}
            isInvalid={valUsername}
            errorMessage={valUsername && errorMsgUser}
            onChange={handleUsername}
          />

          <Input label="Email" placeholder="Enter your email" size='sm' value={email} autocomplete="off"
            isInvalid={valEmail}
            color={valEmail ? 'danger' : ''}
            errorMessage={valEmail && errorMsgEmail}
            onChange={handleEmail}
          />

          <Input type='text' label="First name" placeholder="Enter your first name" size='sm' value={firstName}
            color={valFirstName ? 'danger' : ''}
            isInvalid={valFirstName}
            errorMessage={valFirstName && errorMsgFirstName}
            onChange={handleFirstName}
          />

          <Input type='text' label="Last name" placeholder="Enter your last name" size='sm' value={lastName}
            isInvalid={valLastName}
            errorMessage={valLastName && errorMsgLastName}
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
        <div className='flex text-tiny text-niceOrange-400 justify-end'>
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
        <div className='flex justify-end '>
          <Button
            className={'font-semibold bg-bgBlur-900/80 hover:bg-bgBlur-800'}
            fullWidth
            as={'button'}
            isLoading={isLoadingBtn}
            type="submit"
          >
            Sign Up
          </Button>
        </div>
        {alert ? <Alert message={alertMsg} type={'error'} /> : ''}
      </form>
    </>
  )
}

export default SignUpForm
