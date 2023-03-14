import { Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authenticationModalState } from "@/src/atoms/authenticationModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const setAuthenticationModalState = useSetRecoilState(
    authenticationModalState
  );
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCredentials, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // creating user collection in db
  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCredentials) {
      createUserDocument(userCredentials.user);
    }
  }, [userCredentials]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        required
        name="email"
        type="email"
        placeholder="email"
        mb={2}
        onChange={handleChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        type="password"
        placeholder="password"
        onChange={handleChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        type="password"
        placeholder="confirm password"
        onChange={handleChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        type="submit"
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        isLoading={loading}
      >
        Sign Up
      </Button>

      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor</Text>
        <Text
          color="blue.500"
          cursor="pointer"
          fontWeight={700}
          onClick={() =>
            setAuthenticationModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Login
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
