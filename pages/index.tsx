import type { NextPage } from "next";
// import Head from "next/head"; will add later for SEO
import { useSession } from "next-auth/react";
import router from "next/router";
import LoadingSpinner from "../components/loadingSpinner";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
  } else if (status === "authenticated") {
    router.push("/dashboard/home");
  }

  return <LoadingSpinner />;
};

export default Home;
