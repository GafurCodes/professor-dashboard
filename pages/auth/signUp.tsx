import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ViewIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import { validate } from "email-validator";
import axios from "axios";
import router from "next/router";

export default function SignUp() {
  //I'm using refs instead of useState for inputs because it is more performant
  //useState updates the DOM every time there is a change in the input
  //while I just need to grab the end value of the input when the user presses "Sign Up"
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const signUp = async () => {
    //first if statement to make typescript happy
    //it doesn't like if I pass 'undefined' to the email validator
    //even though that edge case is handled in the email-validator library
    if (!email.current?.value) {
      setIsEmailInvalid(true);
    } else if (validate(email.current?.value)) {
      setIsEmailInvalid(false);
      await axios.post("/api/signup", {
        firstName: firstName.current?.value,
        lastName: lastName.current?.value,
        email: email.current?.value,
        password: password.current?.value,
      });
      router.push("/auth/signIn");
      // .then((res) => console.log(res));
    } else {
      setIsEmailInvalid(true);
    }
  };

  return (
    <Center minH="100vh" minW="100vw">
      <Box boxShadow="md" borderRadius="2xl" padding={20}>
        <VStack spacing={16}>
          <Heading>Sign Up</Heading>
          <VStack spacing={"8"} width="400px">
            <HStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" ref={firstName} />
              </FormControl>{" "}
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" ref={lastName} />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={email} isInvalid={isEmailInvalid} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type="password" ref={password} />
                <InputRightElement>
                  <IconButton
                    bg="transparent"
                    aria-label={"Property to set"}
                    icon={<ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
          <HStack justifyContent="space-between" minW="full">
            <Button
              variant="link"
              size="lg"
              onClick={() => {
                router.push("/auth/signIn");
              }}
            >
              Login
            </Button>
            <Button variant={"solid"} size="lg" onClick={() => signUp()}>
              Sign up
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
