import type { NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";

const Home: NextPage = () => {
  const { status } = useSession();
  console.log(status);
  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  } else if (status === "authenticated") {
    return <h1>hi user</h1>;
  }

  return <h1>loading</h1>;
};

export default Home;
