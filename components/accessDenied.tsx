import { Button } from "@chakra-ui/button";
import { Center, Heading } from "@chakra-ui/layout";
import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <Center minH="100vh" minW="100vw" flexDirection="column">
      <Heading>you are not signed in</Heading>{" "}
      <Button onClick={() => signIn()}>Sign in</Button>
    </Center>
  );
}
