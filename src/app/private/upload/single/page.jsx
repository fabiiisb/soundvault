'use client'
import { Input, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/canvasUtils'
import { BagCross, GalleryAdd, MusicSquareAdd } from 'iconsax-react'
import { getDuration, urlToFile } from '@/utils/functions'
import { ErrorNotify, SuccessNotify, ToastCont } from '@/components/Alerts/Toasts'
import { useRouter } from 'next/navigation'

const UploadSingle = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [songName, setSongName] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [songUrl, setSongUrl] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()

  // errors
  const [valSongName, setValSongName] = useState(false)
  const [errorMsgSongName, setErrorMsgSongName] = useState('')

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
    const file = e.target.files[0]
    if (!file) return

    const songUrl = URL.createObjectURL(file)

    setSelectedSong(file.name)
    setSongUrl(songUrl)
  }

  const handleValSongName = () => {
    if (!songName) {
      setErrorMsgSongName('Song name cannot be empty')
      setValSongName(true)

      return false
    } else if (songName.length < 3) {
      setErrorMsgSongName('Minimum 3 characters')
      setValSongName(true)

      return false
    } else if (songName.length > 35) {
      setErrorMsgSongName('Maximum 32 characters')
      setValSongName(true)

      return false
    }

    setValSongName(false)
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

  const handleValNewSong = () => {
    if (!songUrl) {
      setValSong(true)

      return false
    }

    setValSong(false)
    return true
  }

  const submitNewSong = async (e) => {
    e.preventDefault()

    const valSongName = handleValSongName()
    const valCroppedImage = handleValCroppedImage()
    const valNewSong = handleValNewSong()

    if (valSongName && valCroppedImage && valNewSong) {
      setLoading(true)

      const duration = await getDuration(songUrl)
      const croppedImageFile = await urlToFile(croppedImage)
      const songFile = await urlToFile(songUrl)

      const formData = new FormData()
      formData.append('songName', String(songName).trim())
      formData.append('croppedImgUrl', croppedImageFile)
      formData.append('newSongUrl', songFile)
      formData.append('songDuration', String(duration).trim())

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/single`,
        {
          method: 'POST',
          body: formData
        }
      )
        .then(res => res.json())
        .then(res => {
          console.log('respuesta front')
          console.log(res)

          SuccessNotify('Song created successfully!')
          router.push(`/song/${res.data}`)

          setBtnDisabled(true)
          setLoading(false)
        })
        .catch((err) => {
          console.log('error front')
          console.log(err)

          ErrorNotify()
          setLoading(false)
        })
    }
  }

  return (
    <>
      <ToastCont />

      <div >
        <h1 className="text-2xl pb-2 font-bold underline underline-offset-[3px] decoration-niceOrange-400 decoration-2">Upload your single
        </h1>
        <form
          className='mt-3 flex flex-col gap-3 max-w-[500px] mx-auto'
          onSubmit={submitNewSong}
        >

          <Input
            type="text"
            label="Song name"
            size={'sm'}
            placeholder="Enter name of your song"
            color={valSongName ? 'danger' : ''}
            isInvalid={valSongName}
            errorMessage={valSongName && errorMsgSongName}
            value={songName}
            onChange={e => setSongName(e.target.value.slice(0, 35))}
          />

          <div className="group flex items-center justify-center w-full">
            <label htmlFor="dropzone-file1" className={` ${valCropped ? ' border-danger/70 hover:border-danger' : 'border-content3 '} flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer  hover:bg-bray-800 bg-content2 hover:border-content4 hover:bg-content1`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <GalleryAdd className='w-8 h-8 mb-2 text-white/70 group-hover:text-niceOrange-400' />
                <p className="mb-2 text-sm text-white/70 italic">Click to upload or drag and drop an image</p>
                <p className="text-xs text-white/50">PNG or JPG (250x250px)</p>
              </div>
              <input ref={inputRef} id="dropzone-file1" type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={(e) => onChangeInputImg(e)} />
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

          <div className="group flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file2"
              className={` ${valSong ? ' border-danger/70 hover:border-danger' : 'border-content3 '} flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-content2 hover:border-content4 hover:bg-content1`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <MusicSquareAdd className='w-8 h-8 mb-2 text-white/70 group-hover:text-niceOrange-400' />
                <p className="mb-2 text-sm text-white/70 italic">Click to upload or drag and drop a song</p>
                <p className="text-xs text-white/50">MP3 only</p>
                <p className="text-xs text-niceOrange-400/70">{selectedSong}</p>
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

          {(croppedImage || songUrl) && <section className='flex flex-col gap-4 border-2 border-content2 rounded-large p-2'>
            <h3 className='text-niceOrange-400 font-semibold text-center tracking-wide'>Preview</h3>

            {croppedImage && (
              <div className='relative max-h-[250px] max-w-[250px] w-full  h-auto mx-auto'>
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

            {songUrl && (
              <div>
                <audio controls className='mx-auto'>
                  <source src={songUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </section>}

          <Button
            className='font-semibold bg-content2 hover:bg-content1 hover:text-niceOrange-400'
            isLoading={loading}
            disabled={btnDisabled}
            type='submit'
          >
            Create a new song
          </Button>
        </form>
      </div >
    </>
  )
}

export default UploadSingle
