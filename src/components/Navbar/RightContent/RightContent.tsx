import { Flex, Button } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthenticationModal from "../../Modal/Auth";
import { signOut, User } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent = ({ user }: any) => {
  return (
    <>
      <AuthenticationModal />
      <Flex justify="center" align="center">
        {user ? (
          <>
            <Icons />
          </>
        ) : (
          <AuthButtons />
        )}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};

export default RightContent;
