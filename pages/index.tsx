import type { NextPage } from "next";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";

const Home: NextPage = () => {
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  } else if (status === "authenticated") {
    return <h1>hi user with the email &quot;{data?.user?.email}&quot;</h1>;
  }

  return <h1>loading</h1>;
};

export default Home;
