import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";

interface ExtendedSession extends Session {
  accessToken?: string;
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const config = {
  adapter: MongoDBAdapter(clientPromise as any),
  callbacks: {
    async session({ session, token, user }): Promise<ExtendedSession> {
      // Ensure the session object conforms to the ExtendedSession type
      const extendedSession: ExtendedSession = { ...session, user: { ...session.user } };
      
      if (token && typeof token.accessToken === 'string' && typeof token.id === 'string') {
        extendedSession.accessToken = token.accessToken;
        extendedSession.user.id = token.id;
      }

      return extendedSession;
    },
  },
  providers: [
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        version: "2.0",
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        version: "2.0",
      })
  ], // rest of your config
} as NextAuthOptions;

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, config)
}