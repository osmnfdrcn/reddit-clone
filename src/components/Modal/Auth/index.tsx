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
import {
  authenticationModalState,
  IAuthenticationModalState,
} from "../../../atoms/authenticationModalAtom";
import OAuthButtons from "./OAuthButtons";
import AuthInputs from "./AuthInputs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useEffect } from "react";
import ResetPassword from "./ResetPassword";

const AuthenticationModal = () => {
  const [user, loading, error] = useAuthState(auth);
  const [modalState, setModalState] = useRecoilState(authenticationModalState);
  const handleClose = () =>
    setModalState((state) => ({ ...state, open: false }));

  useEffect(() => {
    if (user) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <Text color="gray.400" fontWeight={700}>
                    {" "}
                    OR
                  </Text>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword toggleView={() => {}} />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthenticationModal;
