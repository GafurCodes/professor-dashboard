import { Box, Heading } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/accessDenied";

export default function Dashboard() {
  const { status } = useSession();
  if (status === "unauthenticated") {
    return <AccessDenied />;
  }
  return (
    <Box>
      <Heading textAlign="center">Dashboard</Heading>
    </Box>
  );
}
