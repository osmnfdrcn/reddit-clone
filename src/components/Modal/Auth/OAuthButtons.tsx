import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

type Props = {};

const OAuthButtons = (props: Props) => {
  return (
    <Flex direction="column" width="100%" m={6}>
      <Button variant="oauth" mb={2}>
        <Image src="/images/googlelogo.png" alt="Google Logo" h="20px" mr={4} />
        Continue With Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
    </Flex>
  );
};

export default OAuthButtons;
