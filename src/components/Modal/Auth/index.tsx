import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authenticationModalState } from "../../../atoms/authenticationModalAtom";
import OAuthButtons from "./OAuthButtons";
import AuthInputs from "./AuthInputs";
const AuthenticationModal = () => {
  const [modalState, setModalState] = useRecoilState(authenticationModalState);
  const handleClose = () =>
    setModalState((state) => ({ ...state, open: false }));

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb={6}
          >
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              width="70%"
            >
              <OAuthButtons />
              <Text color="gray.400" fontWeight={700}>
                OR
              </Text>
              <AuthInputs />
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthenticationModal;
