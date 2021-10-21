import { chakra } from "@chakra-ui/system";
import { useSession } from "next-auth/react";
import router from "next/router";
import AccessDenied from "./accessDenied";
import LoadingSpinner from "./loadingSpinner";
import NavMenu from "./navMenu";

export default function Layout({ children }: { children: JSX.Element }) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <NavMenu />
        <chakra.main ml="17rem">{children}</chakra.main>
      </>
    );
  }

  return <chakra.main>{children}</chakra.main>;
}
