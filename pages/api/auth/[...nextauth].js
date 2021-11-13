import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email } = credentials;
        const { password } = credentials;
        const user = await prisma.user.findFirst({ where: { email: email } });
        const hash = user.password;
        const match = await bcrypt.compare(password, hash);

        if (match) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (user) {
    //     return true;
    //   }
    // },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.token = token;
      return session;
    },
  },
});
