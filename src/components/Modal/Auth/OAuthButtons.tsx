import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

const OAuthButtons = () => {
  const [signInWithGoogle, userCredentials, loading, error] =
    useSignInWithGoogle(auth);

  // creating user collection in db
  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCredentials) {
      createUserDocument(userCredentials.user);
    }
  }, [userCredentials]);

  return (
    <Flex direction="column" width="100%" m={6}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" alt="Google Logo" h="20px" mr={4} />
        Continue With Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
