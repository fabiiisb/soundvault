'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from '@nextui-org/react'
import { MusicSquareRemove } from 'iconsax-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteSingleModal ({ singleId, singleName }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDeleteSingle = () => {
    setIsLoading(true)

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/single/${singleId}`, options)
      .then(response => response.json())
      .then(async res => {
        if (!res.error) {
          router.push('/private/editCollections')
        }
        setIsLoading(false)
      })
      .catch(err => {
        if (err.message === 'Validation error') {
          console.log('validation error')
        } else {
          console.log('Unexpected error')
        }
        setIsLoading(false)
      })
  }

  return (
    <>
      <Tooltip
        content={'Delete single'}
        closeDelay={100}
      >
        <Button
          onPress={onOpen}
          className='font-semibold bg-transparent hover:bg-content2 text-niceOrange-400 min-w-1 '
          type='submit'
        >
          <MusicSquareRemove
            className='text-danger'
          />
        </Button>
      </Tooltip >

      <Modal isOpen={isOpen} onClose={onClose} backdrop='blur' scrollBehavior={'inside'} placement={'center'}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete single
          </ModalHeader>
          <ModalBody>
            <p>
              Are you certain you wish to delete single
              &quot;
              <span className='text-danger font-bold italic'>
                {singleName}
              </span>
              &quot; ? Please note that <span className='font-semibold italic text-warning'>this action is permanent</span>.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} color="danger" variant='flat' onClick={handleDeleteSingle}>
              Delete
            </Button>
            <Button color="default" variant="flat" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
