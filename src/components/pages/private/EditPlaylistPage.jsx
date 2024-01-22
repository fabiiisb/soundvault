'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Image, Input, Button, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { Calendar, Eye, EyeSlash, DocumentUpload, ArrowLeft, MusicPlaylist } from 'iconsax-react'
import SongListOptions from '@/components/private/SongListOptions'
import { ErrorNotify, SuccessNotify, ToastCont } from '@/components/Alerts/Toasts'

const EditPlaylistPage = () => {
  const playlistId = useParams().playlistId
  const [playlistData, setPlaylistData] = useState()
  const [songData, setSongData] = useState()

  const [playlistName, setPlaylistName] = useState()
  const [visibility, setVisibility] = useState()
  const [originalPlaylistName, setOriginalPlaylistName] = useState()
  const [originalVisibility, setOriginalVisibility] = useState()

  // manejo de errores
  const [valPlaylistName, setValPlaylistName] = useState(false)
  const [valVisibility, setValVisibility] = useState(false)
  const [errorMsgPlaylistName, setErrorMsgPlaylistName] = useState('')
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

  const validatePlaylistName = () => {
    if (playlistName === '') {
      setErrorMsgPlaylistName('Playlist name cannot be empty')
      setValPlaylistName(true)

      return false
    } else if (playlistName.length < 3) {
      setErrorMsgPlaylistName('Your playlist name must contain at least 3 characters')
      setValPlaylistName(true)

      return false
    } else if (playlistName.length > 50) {
      setErrorMsgPlaylistName('Your playlist name must have a maximum of 50 characters')
      setValPlaylistName(true)

      return false
    } else {
      setErrorMsgPlaylistName('')
      setValPlaylistName(false)

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

  const handleInputPlaylistName = (e) => {
    setPlaylistName(e.target.value)
  }

  const submit = (ev) => {
    ev.preventDefault()

    const validationPlaylist = validatePlaylistName()
    const validationVisibility = validateVisibility()

    if (validationPlaylist && validationVisibility) {
      const isPlaylistNameChanged = playlistName !== originalPlaylistName
      const isVisibilityChanged = visibility !== originalVisibility

      if (isPlaylistNameChanged || isVisibilityChanged) {
        setIsLoadingBtn(true)
        const playlistArray = {
          PlaylistName: playlistName.trim(),
          Visibility: visibility === 'visible'
        }

        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlist/${playlistId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlistArray)
          }
        )
          .then(res => res.json())
          .then(res => {
            setIsLoadingBtn(false)
            if (res.error || res.validationError) {
              throw new Error('Unexpected error')
            } else {
              const newPlaylistName = playlistArray.PlaylistName
              const newVisibility = playlistArray.Visibility === true ? 'visible' : 'invisible'

              setPlaylistName(newPlaylistName)
              setOriginalPlaylistName(newPlaylistName)
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/playlist/${playlistId}`,
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
          const playlistData = res.data.recordset[0]
          const songData = res.data.recordsets[1]

          setPlaylistData(playlistData)
          setSongData(songData)

          setVisibility(playlistData.visible === true ? 'visible' : 'invisible')
          setOriginalVisibility(playlistData.visible === true ? 'visible' : 'invisible')

          setPlaylistName(playlistData.playlist_name)
          setOriginalPlaylistName(playlistData.playlist_name)

          setNotFound(false)
        } else {
          setNotFound(true)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }, [playlistId])

  if (notFound) {
    return (
      <section className='flex'>
        <div className='mx-auto'>
          <MusicPlaylist className='mx-auto text-niceOrange-400' size={70} />
          <h2 className='my-4 text-2xl text-white/70'>
            Playlist not found
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

  if (!playlistData) {
    return (
      <>
        <Skeleton className='rounded-large max-w-96'>
          <h1 className='text-2xl font-bold '>
            Edit your playlist: Loading
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
          Edit your playlist:
        </span>
        <span>
          {' ' + originalPlaylistName}
        </span>
      </h1>
      <section className='block sm:flex mt-6'>
        <div className='relative flex justify-center w-full mb-3'>
          <Image
            isBlurred
            src={playlistData.playlist_image_url}
            alt='playlist image'
            width={250}
            height={250}
          />

          <div
            className='hover:bg-black/45 absolute w-[250px] max-w-full h-full z-10 rounded-large group'
          >
            <div className='flex items-center justify-center invisible w-full h-full group-hover:visible'>

              <DocumentUpload className='text-white drop-shadow-md w-[30%] h-[30%]' />
              <input
                type="file"
                className='absolute w-full h-full opacity-0 cursor-pointer file:cursor-pointer'
              />
            </div>
          </div>

        </div>

        <div className='w-full text-center'>
          <div className='flex items-center justify-center mt-5 sm:mt-0'>
            <p className='font-semibold text-niceOrange-400'>
              Actual data&nbsp;
            </p>:&nbsp;
            <IconsWithData
              visibility={originalVisibility}
              date={playlistData.playlist_creation_date}
            />
          </div>

          <form className='flex flex-col gap-6 mt-6'>
            <Input
              style={inputStyles}
              placeholder="Enter your playlist name"
              variant='bordered'
              value={playlistName}
              onChange={handleInputPlaylistName}
              color={valPlaylistName ? 'danger' : ''}
              isInvalid={valPlaylistName}
              errorMessage={valPlaylistName && errorMsgPlaylistName}
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
          ? <SongListOptions songList={songData} />
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

export default EditPlaylistPage
