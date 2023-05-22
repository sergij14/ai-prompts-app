"use client";

import Feed from "@/components/Feed";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";

const MyPropfile = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Profile name={session?.user.username} desc="Welcome to your profile" />
      <Feed
        isEditable
        fetchUrl={`/api/prompts?user-id=${session?.user.userDatabaseID}`}
      />
    </div>
  );
};

export default MyPropfile;
