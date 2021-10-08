import type { NextPage } from "next";
// import Head from "next/head"; will add later for SEO
import { useSession } from "next-auth/react";
import router from "next/router";

const Home: NextPage = () => {
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  } else if (status === "authenticated") {
    router.push("/dashboard");
  }

  return <h1>loading</h1>;
};

export default Home;
