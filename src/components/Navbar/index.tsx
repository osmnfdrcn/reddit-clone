import { Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory";
import Logo from "./Logo";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Logo />
      {!!user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
