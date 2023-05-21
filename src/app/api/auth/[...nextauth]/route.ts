import { User } from "@/models/User";
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
          userID,
          userDatabaseID: sessionUser._id.toString(),
        };
      } catch (err) {
        console.log(err);
        return session;
      }
    },
    async signIn({ profile, user }) {
      try {
        await connectToDB();

        const userID = user.id;
        const userExists = await User.findOne({ userID });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            name: profile?.name || "Anonymus-" + userID,
            userID,
            image: user.image,
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
