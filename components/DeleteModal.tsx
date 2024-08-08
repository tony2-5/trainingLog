import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { DELETE_USER } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { signOut } from "next-auth/react";
export default function DeleteModal({session, disabled}: any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [deleteUser, {loading}] = useMutation(DELETE_USER);
  const onSubmitDeleteUser = () => {
    deleteUser({ variables: { deleteaccountId: session.user.id}})
    signOut({ callbackUrl: 'http://localhost:3000/' })
  }
  return (
    <>
      <Button isDisabled={disabled} onPress={onOpen} className="w-full bg-red-500 font-extrabold" size="md">Delete Account</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Account</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete your account?
                </p>
                <p> 
                  <strong>Warning the following action is permanent.</strong>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={loading ? true:false} color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button isDisabled={loading ? true:false} color="danger" onPress={onSubmitDeleteUser}>
                  Delete Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}