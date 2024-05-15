import { Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '@/utils/canvasUtils'
import { GalleryAdd } from 'iconsax-react'

const CropImgInput = ({ setCroppedImage, valCropped }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imgUrl, setImgUrl] = useState(null)
  const inputRef = useRef(null)
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
  return (
    <>
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
    </>

  )
}

export default CropImgInput
