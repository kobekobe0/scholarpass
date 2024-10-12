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

const UpdateButton = ({handleUpdate}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="green" className="w-full" type="whiteAlpha" onClick={onOpen}>
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Picture</ModalHeader>
          <ModalBody>
            Are you sure you want to update your profile picture? You can only do this once a month.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
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

export default UpdateButton;
