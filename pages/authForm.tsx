import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { getSession, signIn, useSession } from "next-auth/react";

import axios from "axios";
import router from "next/router";

export default function Auth() {
  //tracking of the current session
  const { status } = useSession();
  console.log(status);

  //tracking whether the credentials are invalid
  const [areInvalid, setAreInvalid] = useState(false);

  //tracking  form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //tracking the form type
  const [isSignUp, setIsSignUp] = useState(false);

  //tracking whether the  password showing
  const [showPassword, setShowPassword] = useState(false);
  const showOnClick = () => setShowPassword(!showPassword);

  //

  //

  const sucessfulSignUp = () => {
    setIsSignUp(false);
    setPassword(""), setEmail("");
  };

  //
  // const login = async () => {
  //   await signIn("credentials", {
  //     email: email,
  //     password: password,
  //     redirect: false,
  //   });
  // };

  //
  useEffect(() => {
    if (status === "authenticated") {
      setAreInvalid(false);
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, status]);

  const signUp = () => {
    axios
      .post("/api/signup", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => sucessfulSignUp())
      .catch((err) => console.log(err));
  };

  return (
    <Center minH="100vh" minW="100vw">
      <Box boxShadow="md" borderRadius="2xl" padding={20}>
        <VStack spacing={16}>
          <Heading>{isSignUp ? "Sign Up" : "Login"}</Heading>
          <VStack spacing={"8"} width="400px">
            {areInvalid ? <Text color="red">Invalid credentials</Text> : null}
            {isSignUp ? (
              <HStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>{" "}
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </HStack>
            ) : null}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={areInvalid ? true : false}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={areInvalid ? true : false}
                />
                <InputRightElement>
                  <IconButton
                    bg="transparent"
                    aria-label={
                      showPassword ? "Hide Password" : "Show Password"
                    }
                    onClick={() => showOnClick()}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
          <HStack justifyContent="space-between" minW="full">
            <Button
              variant={isSignUp ? "solid" : "link"}
              onClick={() => {
                if (!isSignUp) {
                  setIsSignUp(true);
                  setAreInvalid(false);
                } else {
                  signUp();
                }
              }}
              size="lg"
            >
              Sign up
            </Button>
            <Button
              variant={isSignUp ? "link" : "solid"}
              onClick={async () => {
                if (isSignUp) {
                  setIsSignUp(false);
                } else {
                  await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false,
                  }).then((res) => {
                    if (res.error === null) {
                      return;
                    } else if (res.error) {
                      setAreInvalid(true);
                    }
                  });
                }
              }}
              size="lg"
            >
              Login
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
