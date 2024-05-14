'use client'
import { Input, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/canvasUtils'
import { BagCross, GalleryAdd, MusicSquareAdd } from 'iconsax-react'
import { getDuration, urlToFile } from '@/utils/functions'
import { ErrorNotify, SuccessNotify, ToastCont } from '@/components/Alerts/Toasts'
import { useRouter } from 'next/navigation'

const UploadAlbum = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [albumName, setAlbumName] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [songs, setSongs] = useState([])
  const [croppedImage, setCroppedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()

  // errors
  const [valAlbumName, setValAlbumName] = useState(false)
  const [errorMsgAlbumName, setErrorMsgAlbumName] = useState('')

  const [valCropped, setValCropped] = useState(false)
  const [valSong, setValSong] = useState(false)
  // errors

  // crop
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState(1)
  // crop

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgUrl,
        croppedAreaPixels
      )
      onClose()
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  const onChangeInputImg = async (e) => {
    const file = e.target.files[0]
    inputRef.current.value = ''

    if (!file) return

    const imageURL = URL.createObjectURL(file)
    setImgUrl(imageURL)
    onOpen()
  }
  // crop

  const onChangeInputSong = async (e) => {
    const files = Array.from(e.target.files)

    if (songs.length >= 10) {
      ErrorNotify('You can upload a maximum of 10 songs')
      return
    }

    const newSongs = await Promise.all(
      files.map(async (file) => {
        const songUrl = URL.createObjectURL(file)
        const songFile = await urlToFile(songUrl)
        const duration = await getDuration(songUrl)

        return {
          song_name: file.name,
          original_song_name: file.name,
          song_url: songUrl,
          song_file: songFile,
          song_duration: duration
        }
      })
    )

    setSongs((prev) => [...prev, ...newSongs])
  }

  const handleSongNameChange = (index, newSongName) => {
    // Crea una copia del array existente
    const updatedSongs = [...songs]

    // Modifica el elemento específico
    updatedSongs[index].song_name = newSongName

    // Establece el nuevo estado
    setSongs(updatedSongs)
  }

  const handleDeleteSong = (index) => {
    // Copia el estado actual
    const updatedSongs = [...songs]

    // Elimina el elemento por índice
    updatedSongs.splice(index, 1)

    // Establece el nuevo estado
    setSongs(updatedSongs)
  }

  const handleValAlbumName = () => {
    if (!albumName) {
      setErrorMsgAlbumName('Album name cannot be empty')
      setValAlbumName(true)

      return false
    } else if (albumName.length < 3) {
      setErrorMsgAlbumName('Minimum 3 characters')
      setValAlbumName(true)

      return false
    } else if (albumName.length > 50) {
      setErrorMsgAlbumName('Maximum 50 characters')
      setValAlbumName(true)

      return false
    }

    setValAlbumName(false)
    return true
  }

  const handleValCroppedImage = () => {
    if (!croppedImage) {
      setValCropped(true)

      return false
    }

    setValCropped(false)
    return true
  }

  const handleValNewSongs = () => {
    if (songs.length === 0) {
      setValSong(true)

      return false
    } else if (songs.length <= 1) {
      setValSong(true)
      ErrorNotify('The album must contain more than one song')

      return false
    }

    setValSong(false)
    return true
  }

  const submitNewSong = async (e) => {
    e.preventDefault()

    const valAlbumName = handleValAlbumName()
    const valCroppedImage = handleValCroppedImage()
    const valNewSongs = handleValNewSongs()

    if (valAlbumName && valCroppedImage && valNewSongs) {
      setLoading(true)

      const croppedImageFile = await urlToFile(croppedImage)

      const formData = new FormData()

      formData.append('albumName', String(albumName).trim())
      formData.append('croppedImgUrl', croppedImageFile)

      songs.forEach((song, index) => {
        formData.append(`songFile[${index}]`, song.song_file)
        formData.append(`songName[${index}]`, song.song_name)
        formData.append(`songDuration[${index}]`, song.song_duration)
      })

      fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/album`,
          {
            method: 'POST',
            body: formData
          }
      )
        .then(res => res.json())
        .then(res => {
          SuccessNotify('Song created successfully!')
          router.push(`/album/${res.data}`)
          setBtnDisabled(true)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)

          ErrorNotify()
          setLoading(false)
        })
    }
  }

  return (
  <>
    <ToastCont />
    <div >
      <h1 className="text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2">
        Upload your album
      </h1>
      <form
        className='mt-3 flex flex-col gap-3 max-w-[500px] mx-auto'
        onSubmit={submitNewSong}
      >

        <Input
          type="text"
          label="Album name"
          size={'sm'}
          placeholder="Enter name of your album"
          color={valAlbumName ? 'danger' : ''}
          isInvalid={valAlbumName}
          errorMessage={valAlbumName && errorMsgAlbumName}
          value={albumName}
          onChange={e => setAlbumName(e.target.value.slice(0, 50))}
        />

        <div className="group flex items-center justify-center w-full">
          <label htmlFor="dropzone-file1" className={` ${valCropped ? ' border-danger/70 hover:border-danger' : 'border-content3 '} flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer  hover:bg-bray-800 bg-content2 hover:border-content4 hover:bg-content1`}>
            <div className="flex flex-col items-center justify-center pt-3 pb-3">
              <GalleryAdd className='w-8 h-8 mb-2 text-white/70 group-hover:text-niceOrange-400' />
              <p className="mb-2 text-sm text-white/70 italic">Click to upload your image</p>
              <p className="text-xs text-white/50">PNG or JPG (250x250px)</p>
            </div>
            <input
              ref={inputRef}
              id="dropzone-file1"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => onChangeInputImg(e)}
              multiple
            />
          </label>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} hideCloseButton backdrop='blur' size='5xl' placement={'center'} className=''>
          <ModalContent className='h-[90vh]'>
            <ModalHeader className=''>
              Cut your image
            </ModalHeader>
            <ModalBody className='relative'>
              <Cropper
                image={imgUrl}
                crop={crop}
                cropSize={{ width: 250, height: 250 }}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => { onClose(); setImgUrl(null) }}>
                Close
              </Button>
              <Button color="primary" onClick={showCroppedImage}>
                Cut and save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="group items-center justify-center w-full">
          <label
            htmlFor="dropzone-file2"
            className={`${valSong ? 'border-danger/70 hover:border-danger' : 'border-content3'
              } flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-content2 hover:border-content4 hover:bg-content1`}
          >
            <div className="flex flex-col items-center justify-center pt-3 pb-3">
              <MusicSquareAdd className="w-8 h-8 mb-2 text-white/70 group-hover:text-niceOrange-400" />
              <p className="mb-2 text-sm text-white/70 italic">Click to upload your songs</p>
              <p className="text-xs text-white/50 mb-2">MP3 only</p>
            </div>
            <input
              id="dropzone-file2"
              type="file"
              className="hidden"
              accept="audio/mp3"
              onChange={(e) => onChangeInputSong(e)}
            />
          </label>
        </div>

        {(croppedImage || (songs.length !== 0)) && <section className='flex flex-col gap-4 border-2 border-content2 rounded-large p-2'>
          <h3 className='text-niceOrange-400 font-semibold text-center tracking-wide'>
            Preview
          </h3>

          {croppedImage && (
            <div className='relative max-h-[250px] max-w-[250px] w-full h-auto mx-auto'>
              <img className='border border-content1 rounded-medium h-full w-full object-fill' src={croppedImage} />
              <Button
                className='group m-1 absolute top-0 right-0 rounded-full bg-transparent/30 hover:bg-transparent/70'
                isIconOnly
                onClick={() => setCroppedImage(null)}
              >
                <BagCross className='text-danger/80 group-hover:text-danger' />
              </Button>
            </div>
          )}

          <div>
            {songs && songs.length > 0 &&
              (
                songs.map((song, index) => (
                  <div key={index} className="my-4  bg-content2 p-2 rounded-medium">

                    <div className='flex justify-between items-center mb-1'>
                      <p className='text-[12px] pl-1 text-white/60 truncate'>
                        {song.original_song_name}
                      </p>
                      <Button
                        className=' group rounded-full bg-transparent/30 hover:bg-transparent/70'
                        size={'sm'}
                        isIconOnly
                        onClick={() => handleDeleteSong(index)}
                      >
                        <BagCross size={18} className='text-danger/80 group-hover:text-danger' />
                      </Button>
                    </div>

                    <div className='flex flex-col items-center gap-2'>
                      <input
                        type="text"
                        className="w-full pl-2 py-1 rounded-small border-none outline-0"
                        placeholder='Type your song name'
                        onChange={(e) => handleSongNameChange(index, e.target.value)}
                        required
                        minLength={3}
                        maxLength={35}
                      />
                      <audio controls className='w-full'>
                        <source src={song.song_url} type="audio/mp3" />
                      </audio>
                    </div>

                  </div>
                ))
              )
            }
          </div>

        </section>

        }

        <Button
          className='font-semibold bg-content2 hover:bg-content1 hover:text-niceOrange-400'
          isLoading={loading}
          disabled={btnDisabled}
          type='submit'
        >
          Create a new album
        </Button>
      </form>
    </div >
  </>
  )
}

export default UploadAlbum
