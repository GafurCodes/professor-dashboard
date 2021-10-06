import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import NavMenu from "../components/navMenu";
import { prisma } from "../lib/prisma";
import safeJsonStringify from "safe-json-stringify";

interface props {
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    error?: string;
  };
}

export default function Dashboard({ userData }: props) {
  console.log(userData);
  if (!userData.error) {
    return <NavMenu userData={userData} />;
  } else if (userData.error) {
    return (
      <>
        <h1>you are not authenticated</h1>
        <button onClick={() => signIn()}> sign in</button>
      </>
    );
  }
  return <h1>loading</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        userData: {
          error: "iserror",
        },
      },
    };
  }

  const { user } = session;

  const userFromDb = await prisma.user.findFirst({
    where: {
      email: user?.email!,
    },
  });

  const stringifiedData = safeJsonStringify(userFromDb!);

  const userData = JSON.parse(stringifiedData);
  return {
    props: {
      userData: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    },
  };
};
