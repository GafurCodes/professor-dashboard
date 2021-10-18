import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { getSession, signIn } from "next-auth/react";
import router from "next/router";
import { useRef, useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const login = async () => {
    await signIn("credentials", {
      email: email.current?.value,
      password: password.current?.value,
      redirect: false,
    });

    const session = await getSession();

    if (session) {
      setInvalidCredentials(false);
      router.push("/dashboard/home");
    } else if (!session) {
      setInvalidCredentials(true);
    }
  };

  return (
    <Center minH="100vh" minW="100vw">
      <Box boxShadow="md" borderRadius="2xl" padding={20}>
        <VStack spacing={16}>
          <Heading>Sign In</Heading>
          <VStack spacing={"8"} width="400px">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={email} isInvalid={invalidCredentials} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  ref={password}
                  isInvalid={invalidCredentials}
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
              size="lg"
              variant="link"
              onClick={() => {
                router.push("/auth/signUp");
              }}
            >
              Sign up
            </Button>
            <Button size="lg" onClick={() => login()}>
              Login
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
