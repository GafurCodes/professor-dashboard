import { useSession } from "next-auth/react";
import NavMenu from "./navMenu";

export default function Layout({ children }: { children: JSX.Element }) {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? <NavMenu /> : null}
      <main>{children}</main>
    </>
  );
}
