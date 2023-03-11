import { Flex, Image } from "@chakra-ui/react";
import Logo from "./Logo";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Logo />
      <SearchInput />
      <RightContent />
    </Flex>
  );
};

export default Navbar;
