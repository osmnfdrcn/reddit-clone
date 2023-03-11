import { Flex, Image } from "@chakra-ui/react";
import Logo from "./Logo";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { auth } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Logo />
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
