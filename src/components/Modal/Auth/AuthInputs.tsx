import { authenticationModalState } from "@/src/atoms/authenticationModalAtom";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import Signup from "./Signup";

const AuthInputs = () => {
  const modalState = useRecoilValue(authenticationModalState);
  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modalState.view === "login" ? <Login /> : null}
      {modalState.view === "signup" ? <Signup /> : null}
    </Flex>
  );
};
export default AuthInputs;
