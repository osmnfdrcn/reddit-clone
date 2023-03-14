import { auth, firestore } from "@/src/firebase/clientApp";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateCommunityModal = ({ isOpen, handleClose }: Props) => {
  const [communityName, setCommunityName] = useState("");
  const [charsNumberRemaning, setCharsNumberRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharsNumberRemaining(21 - communityName.length);
  };

  const communityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) {
      setError("");
    }
    // check if community name is valid
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    // const format = /^[a-zA-Z0-9]{3,}$/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }
    setIsLoading(true);
    try {
      // check if community exists
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction: any) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry r/${communityName} is taken. Try another.`);
        }
        // create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("Handle Community Error :", error);
      setError(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection="column"
              padding={"10px 0px"}
              //   border="1px solid"
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color={"gray.500"} fontSize={11}>
                Community name including capitilization cannot be changed
              </Text>
              <Text
                position={"relative"}
                top={"28px"}
                left={"10px"}
                width={"20px"}
                color={"gray.400"}
              >
                r/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                pl={"22px"}
                size={"sm"}
                onChange={handleChange}
              />
              <Text
                fontSize={"9pt"}
                color={charsNumberRemaning === 0 ? "red" : "gray.500"}
              >
                {charsNumberRemaning} characters remaining
              </Text>
              <Text fontSize={"9pt"} color={"red"} pt={1}>
                {error}
              </Text>
              <Box my={4}>
                <Text fontWeight={600}>Community Type</Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={communityTypeChange}
                  >
                    <Flex alignItems="center">
                      <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>

                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={communityTypeChange}
                  >
                    <Flex alignItems={"center"}>
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize={"10pt"} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Anyone can view this community, but only approved users
                        can text and comment
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={communityTypeChange}
                  >
                    <Flex alignItems={"center"}>
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize={"10pt"} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Only approved users can view, text and comment
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter>
            <Button
              variant={"outline"}
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={isLoading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
