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

const UpdateAccountButton = ({handleSubmit}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="green" className="w-full" type="whiteAlpha" onClick={onOpen}>
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Account Details</ModalHeader>
          <ModalBody>
            Are you sure you want to update your account details?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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

export default UpdateAccountButton;
