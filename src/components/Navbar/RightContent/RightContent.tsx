import { Flex, Button } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthenticationModal from "../../Modal/Auth";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";

type RightContentProps = {
  user: any;
};

const RightContent = ({ user }: any) => {
  return (
    <>
      <AuthenticationModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut(auth)}>Logout</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;
