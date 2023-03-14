import { ICommunity } from "@/src/atoms/communitiesAton";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "@/src/hooks/useCommunityData";

type HeaderProps = {
  communityData: ICommunity;
};

const Header = ({ communityData }: HeaderProps) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height={"50%"} bg="blue.400" />
      <Flex bg={"white"} flexGrow={1} justify={"center"}>
        <Flex width={"95%"} maxWidth={"860px"}>
          {communityData?.imageURL ? (
            <Image src={communityData.imageURL} alt={communityData.id} />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border={"4px solid white"}
              borderRadius="50%"
            />
          )}
          <Flex padding={"10px 16px "}>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={800} fontSize={"16pt"}>
                {communityData.id}
              </Text>
              <Text fontWeight={600} color="gray.400" fontSize={"10pt"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              px={6}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
