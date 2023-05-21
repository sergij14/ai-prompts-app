"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [userPanelOpen, setUserPanelOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <h1>
          <Link className="logo" href={"/"}>
            Prompts App
          </Link>
        </h1>
        <div className="user-panel-container">
          {!session ? (
            <button className="btn-default" onClick={() => signIn()}>
              Sing In
            </button>
          ) : (
            <>
              <button
                onClick={() => setUserPanelOpen(!userPanelOpen)}
                className="text-black flex gap-2 items-center"
              >
                <img
                  width={28}
                  className="rounded-full"
                  src={session.user?.image!}
                />
                <span className="text-sm">{session.user?.name}</span>
              </button>
              {userPanelOpen && (
                <div className="user-panel">
                  <Link className="btn-light" href={"/profile"}>
                    Profile
                  </Link>
                  <Link className="btn-light" href={"/prompt-create"}>
                    Create Prompt
                  </Link>
                  <button className="btn-dark" onClick={() => signOut()}>
                    Sing Out
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
