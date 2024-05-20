'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Input, Button, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { Calendar, Eye, EyeSlash, ArrowLeft, MusicPlaylist } from 'iconsax-react'
import AlbumSongListOptions from '@/components/private/AlbumSongListOptions'
import { ErrorNotify, SuccessNotify, ToastCont } from '@/components/Alerts/Toasts'
import AlbumReplaceCropImgInput from '@/components/Forms/CropImage/AlbumReplaceCropImgInput'

const EditAlbumPage = () => {
  const albumId = useParams().albumId
  const [albumData, setAlbumData] = useState()
  const [songData, setSongData] = useState()

  const [albumName, setAlbumName] = useState()
  const [visibility, setVisibility] = useState()
  const [originalAlbumName, setOriginalAlbumName] = useState()
  const [originalVisibility, setOriginalVisibility] = useState()
  // manejo de errores
  const [valAlbumName, setValAlbumName] = useState(false)
  const [valVisibility, setValVisibility] = useState(false)
  const [errorMsgAlbumName, setErrorMsgAlbumName] = useState('')
  const [errorMsgVisibility, setErrorMsgVisibility] = useState('')
  const [notFound, setNotFound] = useState(false)

  const [isLoadingBtn, setIsLoadingBtn] = useState(false)

  const inputStyles = {
    fontWeight: 600,
    fontSize: '1.15rem',
    lineHeight: '1.75',
    textAlign: 'center',
    width: '100%'
  }

  const validateAlbumName = () => {
    if (albumName === '') {
      setErrorMsgAlbumName('Album name cannot be empty')
      setValAlbumName(true)

      return false
    } else if (albumName.length < 3) {
      setErrorMsgAlbumName('Your album name must contain at least 3 characters')
      setValAlbumName(true)

      return false
    } else if (albumName.length > 50) {
      setErrorMsgAlbumName('Your album name must have a maximum of 50 characters')
      setValAlbumName(true)

      return false
    } else {
      setErrorMsgAlbumName('')
      setValAlbumName(false)

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

  const handleInputAlbumName = (e) => {
    setAlbumName(e.target.value)
  }

  const submit = (ev) => {
    ev.preventDefault()

    const validationAlbum = validateAlbumName()
    const validationVisibility = validateVisibility()

    if (validationAlbum && validationVisibility) {
      const isAlbumNameChanged = albumName !== originalAlbumName
      const isVisibilityChanged = visibility !== originalVisibility

      if (isAlbumNameChanged || isVisibilityChanged) {
        setIsLoadingBtn(true)
        const albumArray = {
          AlbumName: albumName.trim(),
          Visibility: visibility === 'visible'
        }

        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/album/${albumId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumArray)
          }
        )
          .then(res => res.json())
          .then(res => {
            setIsLoadingBtn(false)
            if (res.error || res.validationError) {
              throw new Error('Unexpected error')
            } else {
              const newAlbumName = albumArray.AlbumName
              const newVisibility = albumArray.Visibility === true ? 'visible' : 'invisible'

              setAlbumName(newAlbumName)
              setOriginalAlbumName(newAlbumName)
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/album/${albumId}`,
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
          const albumData = res.data.recordset[0]
          const songData = res.data.recordsets[1]

          setAlbumData(albumData)
          setSongData(songData)

          setVisibility(albumData.visible === true ? 'visible' : 'invisible')
          setOriginalVisibility(albumData.visible === true ? 'visible' : 'invisible')

          setAlbumName(albumData.album_name)
          setOriginalAlbumName(albumData.album_name)

          setNotFound(false)
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [albumId])

  if (notFound) {
    return (
      <section className='flex'>
        <div className='mx-auto'>
          <MusicPlaylist className='mx-auto text-niceOrange-400' size={70} />
          <h2 className='my-4 text-2xl text-white/70'>
            Album not found
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

  if (!albumData) {
    return (
      <>
        <Skeleton className='rounded-large max-w-96'>
          <h1 className='text-2xl font-bold '>
            Edit your album: Loading
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
      <h1 className='text-2xl font-bold truncate'
      >
        <span className='underline underline-offset-[3px] decoration-niceOrange-400 decoration-2'>
          Edit album:
        </span>
        <span className=''>
          {' ' + originalAlbumName}
        </span>
      </h1>
      <section className='block sm:flex mt-6'>

        <AlbumReplaceCropImgInput
          id={albumId}
          actualImage={albumData.album_image_url}
        />

        <div className='w-full text-center'>
          <div className='flex items-center justify-center mt-5 sm:mt-0'>
            <p className='font-semibold text-niceOrange-400'>
              Actual data&nbsp;
            </p>:&nbsp;
            <IconsWithData
              visibility={originalVisibility}
              date={albumData.album_creation_date}
            />
          </div>

          <form className='flex flex-col gap-6 mt-6'>
            <Input
              style={inputStyles}
              placeholder="Enter your album name"
              variant='bordered'
              value={albumName}
              onChange={handleInputAlbumName}
              color={valAlbumName ? 'danger' : ''}
              isInvalid={valAlbumName}
              errorMessage={valAlbumName && errorMsgAlbumName}
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

      <section className='mt-10'>
        {songData.length >= 1
          ? <AlbumSongListOptions songList={songData} />
          : ''
        }
      </section>

    </>
  )
}

const IconsWithData = ({ date, visibility }) => {
  return (
    <div className='flex justify-center gap-3 text-small text-white/80 '>
      <div className="flex items-center gap-1">
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
      /
      <div className="flex items-center gap-1" >
        <Calendar size={15} className='text-white' />
        <p>
          {new Date(date).getFullYear()}
        </p>
      </div>
    </div>
  )
}

export default EditAlbumPage
