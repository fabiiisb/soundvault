import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Image } from '@nextui-org/react'
import { useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/canvasUtils'
import { DocumentUpload } from 'iconsax-react'
import { urlToFile } from '@/utils/functions'
import { useSession } from 'next-auth/react'

const UserReplaceCropImgInput = ({ actualImage }) => {
  const { update } = useSession()
  const [croppedImage, setCroppedImage] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imgUrl, setImgUrl] = useState(null)
  const inputRef = useRef(null)

  // crop
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState(1)
  // crop

  const fetchReplaceImage = async (img) => {
    const croppedImageFile = await urlToFile(img)
    const formData = new FormData()

    formData.append('croppedImgFile', croppedImageFile)

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/imageUser`,
      {
        method: 'PUT',
        body: formData
      }
    )
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          update({ image: res.data })
          setCroppedImage(img)
        } else {
          throw new Error('Undexpected error')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

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

      fetchReplaceImage(croppedImage)
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

  return (
    <>
      <div className='relative flex justify-center w-full mb-3'>
        <Image
          isBlurred
          src={croppedImage || actualImage}
          alt='Album image'
          width={250}
          height={250}
        />

        <div
          className='hover:bg-black/45 absolute w-[250px] max-w-full h-full z-10 rounded-large group'
        >
          <div className='flex items-center justify-center invisible w-full h-full group-hover:visible'>

            <DocumentUpload className='text-white drop-shadow-md w-[30%] h-[30%]' />
            <input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className='absolute w-full h-full opacity-0 cursor-pointer file:cursor-pointer'
              onChange={(e) => onChangeInputImg(e)}
            />
          </div>
        </div>

      </div>

      <Modal isOpen={isOpen} onClose={onClose} hideCloseButton backdrop='blur' size='5xl' placement={'center'}>
        <ModalContent className='h-[90vh]'>
          <ModalHeader>
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
    </>

  )
}

export default UserReplaceCropImgInput
