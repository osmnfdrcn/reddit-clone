import { authenticationModalState } from "@/src/atoms/authenticationModalAtom";
import { communityState } from "@/src/atoms/communitiesAton";
import { auth } from "@/src/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useResetRecoilState, useSetRecoilState } from "recoil";

type UserMenuProps = {
  user?: User | null;
};

function UserMenu({ user }: UserMenuProps) {
  const setAuthModalState = useSetRecoilState(authenticationModalState);
  const resetCommunityState = useResetRecoilState(communityState);

  const logout = async () => {
    await signOut(auth);
    resetCommunityState();
  };
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  fontSize={24}
                  mr={1}
                  color={"gray.300"}
                />
                <Flex direction="column" align="start" mx={2}>
                  <Text fontSize="9pt" color="gray.500">
                    {user.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex fontSize="9pt">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400" fontSize="9pt">
                      1 Karma
                    </Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} mr={1} color={"gray.400"} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={3} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={3} />
                Logout
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={3} />
                {user ? "Logout" : "Login"}
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
