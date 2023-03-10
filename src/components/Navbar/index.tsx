import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
const Navbar = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex align="center">
        <Image src="/images/redditFace.svg" alt="" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt=""
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* <Directory />
      
      <RightContent /> */}
      <SearchInput />
    </Flex>
  );
};

export default Navbar;
