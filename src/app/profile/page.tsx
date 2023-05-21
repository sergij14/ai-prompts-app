"use client";

import Feed from "@/components/Feed";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";

const MyPropfile = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Profile name={session?.user.name} desc="Welcome to your profile" />
      <Feed
        fetchUrl={`/api/prompts?user-id=${session?.userDatabaseID}`}
      />
    </div>
  );
};

export default MyPropfile;
