import type { NextPage } from "next";
// import Head from "next/head"; will add later for SEO
import { useSession } from "next-auth/react";
import router from "next/router";
import AccessDenied from "../components/accessDenied";
import LoadingSpinner from "../components/loadingSpinner";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return <LoadingSpinner />;
};

export default Home;
