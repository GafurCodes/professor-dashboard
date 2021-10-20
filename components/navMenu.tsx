import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import router from "next/router";

export default function NavMenu() {
  const { data } = useSession();
  console.log(data);
  const firstName = data?.token.firstName;
  const lastName = data?.token.lastName;

  return (
    <VStack
      mt="1rem"
      position="absolute"
      minH="100vh"
      h="100%"
      left="0"
      top="0"
      minW="17vw"
      boxShadow="xl"
      spacing={10}
    >
      <HStack>
        <Avatar name={`${firstName} ${lastName}`} src="to be decided" />
        <Text>
          {firstName} {lastName}
        </Text>
      </HStack>
      <Button onClick={() => router.push("/dashboard/scenes")}>Scenes</Button>
    </VStack>
  );
}
