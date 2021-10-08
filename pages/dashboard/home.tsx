import { Box, Heading } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import AccessDenied from "../../components/accessDenied";

export default function Dashboard() {
  const { data } = useSession();

  if (!data?.token) {
    return <AccessDenied />;
  }
  return (
    <Box ml="15rem">
      <Heading textAlign="center">Dashboard</Heading>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       props: {
//         userData: {
//           error: "iserror",
//         },
//       },
//     };
//   }

//   const { user } = session;

//   const userFromDb = await prisma.user.findFirst({
//     where: {
//       email: user?.email!,
//     },
//   });

//   const stringifiedData = safeJsonStringify(userFromDb!);

//   const userData = JSON.parse(stringifiedData);
//   return {
//     props: {
//       userData: {
//         email: userData.email,
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//       },
//     },
//   };
// };

// if (!userData.error) {
//   return <NavMenu userData={userData} />;
// } else if (userData.error) {
//   return (
//     <>
//       <h1>you are not authenticated</h1>
//       <button onClick={() => signIn()}> sign in</button>
//     </>
//   );
// }
// return <h1>loading</h1>;
