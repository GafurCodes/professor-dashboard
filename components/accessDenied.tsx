import { Button } from "@chakra-ui/button";
import { Center, Heading } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <Center minH="100vh" minW="100vw" flexDirection="column">
      <VStack spacing={10}>
        <Heading>You are not signed in.</Heading>{" "}
        <Button size="lg" onClick={() => signIn()} colorScheme="blue">
          Sign in
        </Button>
      </VStack>
    </Center>
  );
}
