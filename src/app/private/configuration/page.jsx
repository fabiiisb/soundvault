'use client'
import { useSession } from 'next-auth/react'
import UserReplaceCropImgInput from '@/components/Forms/CropImage/UserReplaceCropImgInput'
import { Spinner, Input, Button, Modal, useDisclosure, ModalFooter, ModalBody, ModalHeader, ModalContent, Skeleton, Image } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { ErrorNotify, SuccessNotify, ToastCont } from '@/components/Alerts/Toasts'

const page = () => {
  const { data: session } = useSession()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [userData, setUserData] = useState()
  const [newUserData, setNewUserData] = useState()
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [valName, setValName] = useState(false)
  const [valLastName, setValLastName] = useState(false)
  const [valPassword, setValPassword] = useState(false)

  const [errorMsgName, setErrorMsgName] = useState('')
  const [errorMsgLastName, setErrorMsgLastName] = useState('')
  const [errorMsgPassword, setErrorMsgPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/user`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          const data = res.data.recordset[0]

          setUserData(data)

          setUsername(data.username)
          setName(data.first_name)
          setLastname(data.last_name)
          setEmail(data.email_address)
        } else {
          throw new Error('Unexpected error')
        }
      })
      .catch(err => {
        console.error(err)
        ErrorNotify('An error occurred')
      })
  }, [])

  const validateName = () => {
    if (name === '') {
      setErrorMsgName('First name cannot be empty')
      setValName(true)

      return false
    } else if (name.length < 3) {
      setErrorMsgName('Your first name must contain at least 3 characters')
      setValName(true)
      return false
    } else if (name.length > 50) {
      setErrorMsgName('Your first name must contain a maximum of 50 characters')
      setValName(true)

      return false
    } else {
      setErrorMsgName('')
      setValName(false)

      return true
    }
  }

  const validateLastname = () => {
    if (lastname === '') {
      setErrorMsgLastName('Last name cannot be empty')
      setValLastName(true)

      return false
    } else if (lastname.length < 3) {
      setErrorMsgLastName('Your last name must contain at least 3 characters')
      setValLastName(true)

      return false
    } else if (lastname.length > 50) {
      setErrorMsgLastName('Your last name must contain a maximum of 50 characters')
      setValLastName(true)

      return false
    } else {
      setErrorMsgLastName('')
      setValLastName(false)

      return true
    }
  }

  const fetchUpdateData = (onClose) => {
    setValPassword(false)
    setLoading(true)
    setPassword('')
    setUserData(newUserData)

    const data = {
      ...newUserData,
      password: String(password)
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/user`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        if (!res.error) {
          if (res.message === 'Bad password') {
            setErrorMsgPassword('Incorrect password')
            setValPassword(true)

            return
          }

          onClose()
          SuccessNotify('Saved successfully!')
        }
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
      })
  }

  const submit = (ev) => {
    ev.preventDefault()

    const newData = {
      first_name: String(name),
      last_name: String(lastname)
    }

    // eslint-disable-next-line camelcase
    const { email_address, username, ...dataWithoutEmailAndUsername } = userData
    const areEqual = JSON.stringify(dataWithoutEmailAndUsername) === JSON.stringify(newData)

    if (areEqual) return

    const valName = validateName()
    const valLastname = validateLastname()

    if (valName && valLastname) {
      setNewUserData(newData)
      onOpen()
    }
  }

  if (!userData) {
    return (
      <div>

        <Skeleton className='w-40 rounded-lg mb-2'>
          <p className="text-2xl inline">
            Configurations
          </p>
        </Skeleton>

        <Skeleton className='flex mx-auto max-w-[250px] rounded-lg'>
          <Image width={250} height={250} />
        </Skeleton>

        <div
          className='mt-3 flex flex-col gap-3 max-w-[500px] mx-auto'
        >
          <Skeleton className='w-40 h-8 rounded-lg'>
            <p> Personal information </p>
          </Skeleton>

          <Skeleton className='rounded-lg'>
            <div className='h-12'>input</div>
          </Skeleton>

          <Skeleton className='rounded-lg'>
            <div className='h-12'>input</div>
          </Skeleton>

          <Skeleton className='rounded-lg'>
            <div className='h-12'>input</div>
          </Skeleton>

          <Skeleton className='rounded-lg'>
            <div className='h-12'>input</div>
          </Skeleton>

          <Skeleton className='rounded-lg'>
            <div className='h-12'>button</div>
          </Skeleton>
        </div>

      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2">Configurations
      </h1>

      <ToastCont containerId={'configs'} />

      {session?.user
        ? < UserReplaceCropImgInput
          actualImage={session.user.image}
        />
        : < Spinner
          size='lg'
          className='flex mx-auto mt-10 mb-20'
          classNames={{
            circle1: [
              'border-b-niceOrange-400'
            ],
            circle2: [
              'border-b-niceOrange-400'
            ]
          }}
        />
      }

      <form
        className='mt-3 flex flex-col gap-3 max-w-[500px] mx-auto'
        onSubmit={submit}
      >

        <p
          className='font-bold text-niceOrange-400 text-lg'
        >
          Personal information
        </p>

        <Input
          isDisabled
          type="text"
          label="Username"
          placeholder="Enter a new username"
          value={username}
          size={'sm'}
        />

        <Input
          type="text"
          label="First name"
          placeholder="Enter a new first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={'sm'}
          isInvalid={valName}
          color={valName ? 'danger' : ''}
          errorMessage={valName && errorMsgName}
        />

        <Input
          type="text"
          label="Last name"
          placeholder="Enter a new last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          size={'sm'}
          isInvalid={valLastName}
          color={valLastName ? 'danger' : ''}
          errorMessage={valLastName && errorMsgLastName}
        />

        <Input
          type="email"
          label="Email"
          placeholder="Enter a new email"
          value={email}
          isDisabled
          size={'sm'}
        />

        <Button
          className='font-semibold bg-content2 hover:bg-content1 hover:text-niceOrange-400'
          type='submit'
        >
          Save changes
        </Button>
      </form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm password to save</ModalHeader>
              <ModalBody>
                <p className='text-sm'>Please insert your password to save changes</p>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size={'sm'}
                  isInvalid={valPassword}
                  color={valPassword ? 'danger' : ''}
                  errorMessage={valPassword && errorMsgPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} >
                  Close
                </Button>
                <Button
                  color="danger"
                  variant='flat'
                  onClick={() => fetchUpdateData(onClose)}
                  isLoading={loading}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}

export default page
