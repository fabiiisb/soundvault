'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Input } from '@nextui-org/react'
import { FolderCross } from 'iconsax-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteAlbumModal ({ albumId, albumName }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')
  const router = useRouter()

  const handleDeleteAlbum = () => {
    setIsLoading(true)

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/private/album/${albumId}`, options)
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

  const handleChange = (e) => {
    setConfirmationText(e.target.value)
  }

  return (
    <>
      <Tooltip
        content={'Delete album'}
        closeDelay={100}
      >
        <Button
          onPress={onOpen}
          className='font-semibold bg-transparent hover:bg-content2 text-niceOrange-400 min-w-1 '
          type='submit'
        >
          <FolderCross
            className='text-danger'
          />
        </Button>
      </Tooltip >

      <Modal isOpen={isOpen} onClose={onClose} backdrop='blur' scrollBehavior={'inside'} placement={'center'}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete album
          </ModalHeader>
          <ModalBody >
            <section className='mb-3'>
              <p>
                Are you certain you wish to delete album
                &quot;
                <span className='text-danger font-bold italic'>
                  {albumName}
                </span>
                &quot; ?
              </p>
              <p>
                All songs from this album will be <span className='font-semibold italic text-violet-500'>permanently deleted</span>.
              </p>
              <p>
                Please note that <span className='font-semibold italic text-warning'>this action is permanent</span>.
              </p>
            </section>
            <Input
              clearable
              underlined
              fullWidth
              color="error"
              size="sm"
              label='Type "delete" to confirm'
              value={confirmationText}
              onChange={handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              color="danger"
              variant='flat'
              onClick={handleDeleteAlbum}
              disabled={confirmationText !== 'delete'}
            >
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
