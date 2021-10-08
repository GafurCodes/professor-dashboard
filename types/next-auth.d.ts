import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: {
      email: string;
      firstName: string;
      lastName: string;
      exp: number;
      iat: number;
      sub: string;
    };
  }
}
