'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'

export default function OnlyViewModal ({ title, children, buttonStyle, buttonName }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} className={buttonStyle}>{buttonName}</Button>
      <Modal isOpen={isOpen} onClose={onClose} backdrop='blur'>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" >
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
