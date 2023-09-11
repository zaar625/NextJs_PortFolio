import { signIn } from 'next-auth/react';
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao";
import { NextAuthOptions } from "next-auth";

export const authOption = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
          }),
    ],
    pages: {
        signIn: "/auth/signIn",
      },
}

const handler = NextAuth(authOption);

export {handler as GET, handler as POST}; 