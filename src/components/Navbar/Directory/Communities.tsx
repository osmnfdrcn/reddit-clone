import { Flex, MenuItem, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/Community/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
type Props = {};

const Communities = (props: Props) => {
  const [isOpen, setISOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal
        isOpen={isOpen}
        handleClose={() => setISOpen(false)}
      />
      <MenuItem>
        <Flex
          align="center"
          w="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setISOpen(true)}
        >
          <Icon fontSize={20} mr="2" as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
