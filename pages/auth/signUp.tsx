import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useRef, useState } from "react";
import * as EmailValidator from "email-validator";
import axios from "axios";
import router from "next/router";
import { useToast } from "@chakra-ui/react";

export default function SignUp() {
  //making Typescript happy. Without this interface it assumes that the "status" property is a string, when it has to be an enum according to ChakraUI.
  interface toastConfig {
    id?: string;
    title: string;
    description: string;
    status: "error" | "info" | "warning" | "success" | undefined;
    duration: number;
    isClosable: boolean;
  }

  //invalid email toast
  const invalidEmailToast = useToast();
  const invalidEmailToastConfig: toastConfig = {
    title: "Invalid email.",
    description: "Make sure you haven't made a typo.",
    status: "error",
    duration: 5000,
    isClosable: true,
  };

  //successful signup email toast
  const successfulSignUpToast = useToast();
  const successfulSignUpToastConfig: toastConfig = {
    title: "User created successfully.",
    description: "You will be redirected to the login page in 5 seconds.",
    status: "success",
    duration: 5000,
    isClosable: true,
  };

  //all fields are required toast
  const allFieldsRequiredToast = useToast();
  //declaring an id to prevent duplicate toasts
  const id = "test";
  const allFieldsRequiredToastConfig: toastConfig = {
    id,
    title: "All fields are required.",
    description: "Fields that you missed are highlighted in red.",
    status: "error",
    duration: 5000,
    isClosable: true,
  };

  //I'm using refs instead of useState for inputs because it is more performant
  //useState updates the DOM every time there is a change in the input
  //while I just need to grab the end value of the input when the user presses "Sign Up"
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const signUp = async () => {
    //if email is invalid or empty
    if (
      !email.current?.value ||
      !EmailValidator.validate(email.current?.value)
    ) {
      setIsEmailInvalid(true);
      invalidEmailToast(invalidEmailToastConfig);
    }
    // if all the fields are filled out and email is valid
    else if (
      EmailValidator.validate(email.current?.value) &&
      firstName.current?.value &&
      lastName.current?.value &&
      password.current?.value
    ) {
      setIsEmailInvalid(false);
      await axios.post("/api/signup", {
        firstName: firstName.current?.value,
        lastName: lastName.current?.value,
        email: email.current?.value,
        password: password.current?.value,
      });
      successfulSignUpToast(successfulSignUpToastConfig);
      setTimeout(() => router.push("/auth/signIn"), 5000);
    }
    //if email is valid
    else if (EmailValidator.validate(email.current?.value)) {
      setIsEmailInvalid(false);
    }

    //all these are wrapped in setTimeout 0 to make sure they fire asynchronously. If they don't, the if statements are too fast and multiple toasts show on the screen.

    if (!firstName.current?.value) {
      setIsFirstNameInvalid(true);
      setTimeout(() => {
        if (!allFieldsRequiredToast.isActive(id)) {
          allFieldsRequiredToast(allFieldsRequiredToastConfig);
        }
      }, 0);
    }

    if (!lastName.current?.value) {
      setIsLastNameInvalid(true);
      setTimeout(() => {
        if (!allFieldsRequiredToast.isActive(id)) {
          allFieldsRequiredToast(allFieldsRequiredToastConfig);
        }
      }, 0);
    }

    if (!password.current?.value) {
      setIsPasswordInvalid(true);
      setTimeout(() => {
        if (!allFieldsRequiredToast.isActive(id)) {
          allFieldsRequiredToast(allFieldsRequiredToastConfig);
        }
      }, 0);
    }

    if (firstName.current?.value) {
      setIsFirstNameInvalid(false);
    }
    if (lastName.current?.value) {
      setIsLastNameInvalid(false);
    }
    if (password.current?.value) {
      setIsPasswordInvalid(false);
    }
  };

  //show password icon logic
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Center minH="100vh" minW="100vw">
      <Box boxShadow="md" borderRadius="2xl" padding={20}>
        <VStack spacing={16}>
          <Heading>Sign Up</Heading>
          <VStack spacing={8} width="25rem">
            <HStack spacing={10}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  ref={firstName}
                  isInvalid={isFirstNameInvalid}
                />
              </FormControl>{" "}
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  ref={lastName}
                  isInvalid={isLastNameInvalid}
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={email} isInvalid={isEmailInvalid} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  ref={password}
                  isInvalid={isPasswordInvalid}
                />
                <InputRightElement>
                  <IconButton
                    bg="transparent"
                    aria-label={
                      showPassword ? "Hide Password" : "Show Password"
                    }
                    onClick={() => setShowPassword((oldVal) => !oldVal)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
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
