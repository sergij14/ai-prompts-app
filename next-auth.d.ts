import { UserFromDB } from "@/types";
import NextAuth, { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    expires: string;
    user: {
      image: UserFromDB['image'],
      name: string,
      userDatabaseID: UserFromDB['_id'],
      username: UserFromDB['username'],
      userID: UserFromDB['username'],
    }
  }
}
