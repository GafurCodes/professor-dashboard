import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function LoadingSpinner() {
  return (
    <Center minH="100vh" minW="100vw">
      <Spinner size="lg" />
    </Center>
  );
}
