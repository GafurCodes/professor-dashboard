import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import router from "next/router";
import { GiJigsawBox } from "react-icons/gi";
export default function NavMenu() {
  const { data } = useSession();
  const firstName = data?.token.firstName;
  const lastName = data?.token.lastName;

  return (
    <VStack
      mt="1rem"
      minH="100vh"
      h="100%"
      left="0"
      top="0"
      w="15rem"
      position="fixed"
      boxShadow="xl"
      spacing={10}
    >
      <HStack>
        <Avatar name={`${firstName} ${lastName}`} src="to be decided" />
        <Text>
          {firstName} {lastName}
        </Text>
      </HStack>
      <VStack spacing={5}>
        <Button
          leftIcon={<GiJigsawBox />}
          onClick={() => router.push("/dashboard/scenes")}
        >
          Scenes
        </Button>
      </VStack>
    </VStack>
  );
}
