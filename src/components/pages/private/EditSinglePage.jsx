'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Input, Button, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { Calendar, Eye, EyeSlash, ArrowLeft, MusicPlaylist } from 'iconsax-react'
import { ErrorNotify, SuccessNotify, ToastCont } from '@/components/Alerts/Toasts'
import DeleteSingleModal from '@/components/Modals/DeleteSingleModal'
import PlaylistReplaceCropImgInput from '@/components/Forms/CropImage/PlaylistReplaceCropImgInput'

const EditSinglePage = () => {
  const singleId = useParams().singleId
  const [singleData, setSingleData] = useState()

  const [singleName, setSingleName] = useState()
  const [visibility, setVisibility] = useState()
  const [originalSingleName, setOriginalSingleName] = useState()
  const [originalVisibility, setOriginalVisibility] = useState()

  // manejo de errores
  const [valSingleName, setValSingleName] = useState(false)
  const [valVisibility, setValVisibility] = useState(false)
  const [errorMsgSingleName, setErrorMsgSingleName] = useState('')
  const [errorMsgVisibility, setErrorMsgVisibility] = useState('')
  const [notFound, setNotFound] = useState(false)

  const [isLoadingBtn, setIsLoadingBtn] = useState(false)

  const inputStyles = {
    fontWeight: 600,
    fontSize: '1.15rem',
    lineHeight: '1.75',
    width: '100%'
  }

  const validateSingleName = () => {
    if (singleName === '') {
      setErrorMsgSingleName('Single name cannot be empty')
      setValSingleName(true)

      return false
    } else if (singleName.length < 3) {
      setErrorMsgSingleName('Your single name must contain at least 3 characters')
      setValSingleName(true)

      return false
    } else if (singleName.length > 35) {
      setErrorMsgSingleName('Your single name must have a maximum of 35 characters')
      setValSingleName(true)

      return false
    } else {
      setErrorMsgSingleName('')
      setValSingleName(false)

      return true
    }
  }

  const validateVisibility = () => {
    if (visibility === '') {
      setErrorMsgVisibility('Visibility cannot be empty')
      setValVisibility(true)

      return false
    } else if (visibility === 'visible' || visibility === 'invisible') {
      setErrorMsgVisibility('Invalid visibility')
      setValVisibility(false)

      return true
    }
  }

  const handleSelectionChange = (e) => {
    setVisibility(e.target.value)
  }

  const handleInputSingleName = (e) => {
    setSingleName(e.target.value)
  }

  const submit = (ev) => {
    ev.preventDefault()

    const validationSingle = validateSingleName()
    const validationVisibility = validateVisibility()

    if (validationSingle && validationVisibility) {
      const isSingleNameChanged = singleName !== originalSingleName
      const isVisibilityChanged = visibility !== originalVisibility

      if (isSingleNameChanged || isVisibilityChanged) {
        setIsLoadingBtn(true)
        const singleArray = {
          SingleName: singleName.trim(),
          Visibility: visibility === 'visible'
        }

        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/single/${singleId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(singleArray)
          }
        )
          .then(res => res.json())
          .then(res => {
            setIsLoadingBtn(false)
            if (res.error || res.validationError) {
              throw new Error('Unexpected error')
            } else {
              const newSingleName = singleArray.SingleName
              const newVisibility = singleArray.Visibility === true ? 'visible' : 'invisible'

              setSingleName(newSingleName)
              setOriginalSingleName(newSingleName)
              setVisibility(newVisibility)
              setOriginalVisibility(newVisibility)

              SuccessNotify()
            }
          })
          .catch(() => {
            setIsLoadingBtn(false)
            ErrorNotify()
          })
      }
    }
  }

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/single/${singleId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          const data = res.data

          setSingleData(data)

          setVisibility(data.visible === true ? 'visible' : 'invisible')

          setOriginalVisibility(data.visible === true ? 'visible' : 'invisible')

          setSingleName(data.name)

          setOriginalSingleName(data.name)

          setNotFound(false)
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [singleId])

  if (notFound) {
    return (
      <section className='flex'>
        <div className='mx-auto'>
          <MusicPlaylist className='mx-auto text-niceOrange-400' size={70} />
          <h2 className='my-4 text-2xl text-white/70'>
            Single not found
          </h2>
          <div>
            <Link
              href='/'
              className='flex justify-center items-center text-blue-500 hover:text-blue-400 text-[17px] font-semibold border border-blue-400 p-1 rounded-large'
            >
              <ArrowLeft
                variant='Bold'
                className='mr-2'
              />
              Go back
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (!singleData) {
    return (
      <>
        <Skeleton className='rounded-large max-w-96'>
          <h1 className='text-2xl font-bold '>
            Edit your single: Loading
          </h1>
        </Skeleton>
        <section className='block sm:flex mt-6'>
          <div className='relative flex justify-center w-full mb-3'>
            <Skeleton className='rounded-large'>
              <div className='w-[250px] h-[250px] max-w-full max-h-full'>
                imagen
              </div>
            </Skeleton>

          </div>

          <div className='w-full text-center'>
            <div className='flex items-center justify-center gap-2 mt-5 sm:mt-0'>
              <Skeleton className='rounded-large'>
                Loading
              </Skeleton>
              <Skeleton className='rounded-large'>
                Loading
              </Skeleton>
              <Skeleton className='rounded-large'>
                Loading
              </Skeleton>
            </div>

            <div className='flex flex-col gap-6 mt-6'>
              <Skeleton className='rounded-large'>
                <div className='h-14' />
              </Skeleton>

              <Skeleton className='rounded-large'>
                <div className='h-14' />
              </Skeleton>

              <Skeleton className='rounded-large'>
                <div className='h-10' />
              </Skeleton>
            </div>
          </div >

        </section >

        <section className='mt-10'>
          <Skeleton className='w-full h-96 rounded-large' />
        </section>
      </>
    )
  }

  return (
    <>
      <ToastCont />
      <h1 className='text-2xl font-bold '
      >
        <span className='underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>
          Edit single:
        </span>
        <span>
          {' ' + originalSingleName }
        </span>
      </h1>
      <section className='block sm:flex mt-6'>
        <PlaylistReplaceCropImgInput
          actualImage={singleData.image_url}
          id={singleId}
        />

        <div className='w-full'>
          <div className='w-full flex items-center mt-5 sm:mt-0'>
            <IconsWithData
              visibility={originalVisibility}
              date={singleData.creation_date}
              singleId={singleId}
              singleName={singleData.name}
            />
          </div>
          <form className='flex flex-col gap-5 mt-5'>
            <Input
              style={inputStyles}
              placeholder="Enter your single name"
              variant='bordered'
              value={singleName}
              onChange={handleInputSingleName}
              color={valSingleName ? 'danger' : ''}
              isInvalid={singleName}
              errorMessage={valSingleName && errorMsgSingleName}
            />

            <Select
              label="Visibility"
              placeholder="Select visibility"
              defaultSelectedKeys={[visibility]}
              variant='bordered'
              onChange={handleSelectionChange}
              color={valVisibility ? 'danger' : ''}
              isInvalid={valVisibility}
              errorMessage={valVisibility && errorMsgVisibility}
            >
              <SelectItem
                key={'visible'}
                value={'visible'}
              >
                Visible
              </SelectItem>
              <SelectItem
                key={'invisible'}
                value={'invisible'}
              >
                Invisible
              </SelectItem>

            </Select>

            <Button
              className='font-semibold tracking-wide bg-content1 text-niceOrange-400'
              isLoading={isLoadingBtn}
              type='submit'
              onClick={submit}
            >
              Save
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}

const IconsWithData = ({ date, visibility, singleId, singleName }) => {
  return (
    <div className='w-full flex gap-2 text-small text-white/80 items-center bg-content1 rounded-medium pl-3'>
      <div className="flex items-center gap-1">
        <p className='font-semibold text-niceOrange-400'>
          Single data:
        </p>

        {visibility === 'visible'
          ? (
            <p className='flex items-center gap-1'>
              <Eye size={15} className='text-white' />
              <span>Visible</span>
            </p>
            )
          : (
            <p className='flex items-center gap-1 text-danger/80'>
              <EyeSlash size={15} />
              <span>Invisible</span>
            </p>
            )
        }
      </div>
      <div className="flex items-center gap-1" >
        <Calendar size={15} className='text-white' />
        <p>
          {new Date(date).getFullYear()}
        </p>
      </div>
      <div className='ml-auto'>
        <DeleteSingleModal singleId={singleId} singleName={singleName}/>
      </div>
    </div>
  )
}

export default EditSinglePage
