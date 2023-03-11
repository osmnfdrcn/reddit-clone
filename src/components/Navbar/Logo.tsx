import { Flex, Image } from "@chakra-ui/react";

Flex;
type Props = {};

const Logo = (props: Props) => {
  return (
    <Flex align="center">
      <Image src="/images/redditFace.svg" alt="" height="30px" />
      <Image
        src="/images/redditText.svg"
        alt=""
        height="46px"
        display={{ base: "none", md: "unset" }}
      />
    </Flex>
  );
};

export default Logo;
