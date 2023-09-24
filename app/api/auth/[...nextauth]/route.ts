
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from "next-auth/providers/kakao";


const authOption = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
          }),
    ],
    // pages: {
    //     signIn: "/auth/signIn",
    // },
    callbacks: {
        async redirect() {
            return '/'
          },
    },
}

const handler = NextAuth(authOption);

export {handler as GET, handler as POST}; 