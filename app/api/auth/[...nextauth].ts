// File: pages/api/auth/[...nextauth].ts or .js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import type { NextApiRequest, NextApiResponse } from "next"; 

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ];

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth?.includes("signin");

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  if (isDefaultSigninPage) providers.pop();

  return await NextAuth(req, res, {
    providers,
    // Additional NextAuth configuration here...
  });
}