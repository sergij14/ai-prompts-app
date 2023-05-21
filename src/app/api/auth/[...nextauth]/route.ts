import { User } from "@/models/User";
import { UserFromDB } from "@/types";
import { connectToDB } from "@/utils/connectToDB";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        await connectToDB();

        const userID = token.sub;
        const sessionUser = await User.findOne({ userID });

        return {
          ...session,
          user: {
            ...session.user,
            userDatabaseID: sessionUser._id.toString(),
            username: sessionUser.username,
            userID,
          },
        };
      } catch (err) {
        console.log(err);
        return session;
      }
    },
    async signIn({ profile, user }) {
      try {
        await connectToDB();

        const { id: userID, image } = user;

        const { email, login } = profile as {
          email: UserFromDB["email"];
          login: UserFromDB["username"];
        };

        const userExists = await User.findOne({ userID });

        if (!userExists) {
          await User.create({
            email: email,
            username: login,
            userID,
            image,
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
