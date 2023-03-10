import { authenticationModalState } from "@/src/atoms/authenticationModalAtom";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

function AuthButtons() {
  const setAuthenticationModalState = useSetRecoilState(
    authenticationModalState
  );
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() =>
          setAuthenticationModalState({ open: true, view: "login" })
        }
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() =>
          setAuthenticationModalState({ open: true, view: "signup" })
        }
      >
        Sign Up
      </Button>
    </>
  );
}

export default AuthButtons;
