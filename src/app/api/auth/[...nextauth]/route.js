import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Iv23liF0Lr0pMSYtU0W0",
      clientSecret: "2df463f1cba07889acf3cfc5ec0bbc2a02bc8308",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.name = `${session?.user?.name}_${token?.sub}`;
      return session;
    },
    secret: "default_secret_key",
  },
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
