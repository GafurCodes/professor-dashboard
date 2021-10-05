import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn, useSession } from "next-auth/react";

import axios from "axios";

export default function Auth() {
  const { data, status } = useSession();

  useEffect(() => {}, [status, data]);
  const [showPassword, setShowPassword] = useState(false);
  const showOnClick = () => setShowPassword(!showPassword);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const signUp = () => {
    axios
      .post("http://localhost:3000/api/signup", {
        firstName,
        lastName,
        email,
        password,
      })

      .catch((err) => console.log(err));
  };

  const login = () => {
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  };

  return (
    <Center minH="100vh" minW="100vw">
      <Box boxShadow="md" borderRadius="2xl" padding={20}>
        <VStack spacing={16}>
          <Heading>{isSignUp ? "Sign Up" : "Login"}</Heading>
          <VStack spacing={"8"} width="400px">
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
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              onClick={() => {
                if (isSignUp) {
                  setIsSignUp(false);
                } else {
                  login();
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
