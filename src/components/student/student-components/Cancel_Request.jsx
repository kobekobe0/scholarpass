// CancellationModal.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const CancellationModal = ({handleSubmit}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

    const submit = async () => {
        try {
        await handleSubmit();
        onClose();
        } catch (error) {
        console.log(error);
        }
    }
  return (
    <>
      <Button colorScheme="red" size='sm' type="whiteAlpha" fontSize='xs' onClick={onOpen}>
        Cancel
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancellation Request</ModalHeader>
          <ModalBody>
            Are you sure you want to cancel your request? Please confirm your cancellation.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={submit}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No, Keep it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CancellationModal;
