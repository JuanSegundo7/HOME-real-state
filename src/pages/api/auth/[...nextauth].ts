import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { DefaultJWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      surname: string;
      movil: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    role: string;
    surname: string;
    movil: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    surname: string;
    movil: string;
  }
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    AppleProvider({
      clientId: `${process.env.APPLE_CLIENT_ID}`,
      clientSecret: `${process.env.APPLE_CLIENT_ID}`
    })
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id ?? "",
          role: user?.role ?? "",
          surname: user?.surname ?? "",
          movil: user?.movil ?? "",
        },
      };
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
});
