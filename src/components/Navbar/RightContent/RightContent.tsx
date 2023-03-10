import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthenticationModal from "../../Modal/Auth";
type RightContentButtonsProps = {};

const RightContent = (props: RightContentButtonsProps) => {
  return (
    <>
      <AuthenticationModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
