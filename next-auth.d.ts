import NextAuth, { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    expires: string;
    user: Session["user"];
    userDatabaseID: string;
  }
}
