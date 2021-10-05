import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
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
          throw new Error("invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/authForm",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      }
    },
  },
});
