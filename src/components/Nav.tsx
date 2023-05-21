"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  CpuChipIcon,
} from "@heroicons/react/24/solid";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const Nav = () => {
  const { data: session } = useSession();
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelBtnRef = useRef(null);

  useOnClickOutside(panelRef, panelBtnRef, () => setUserPanelOpen(false));

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
            <button
              className="btn-default flex gap-2 items-center"
              onClick={() => signIn()}
            >
              <ArrowRightOnRectangleIcon width={22} />
              Sign In
            </button>
          ) : (
            <>
              <button
                ref={panelBtnRef}
                onClick={() => setUserPanelOpen(!userPanelOpen)}
                className="text-black flex gap-2 items-center opacity-80 hover:opacity-100"
              >
                <img
                  width={28}
                  className="rounded-full"
                  src={session.user?.image!}
                />
                <span className={`text-sm ${userPanelOpen && "font-semibold"}`}>
                  {session.user?.name}
                </span>
              </button>
              {userPanelOpen && (
                <div className="user-panel" ref={panelRef}>
                  <Link
                    className="btn-light flex gap-2 items-center"
                    href={"/prompt-create"}
                  >
                    <CpuChipIcon width={22} />
                    Create Prompt
                  </Link>
                  <button
                    className="btn-dark flex gap-2 items-center"
                    onClick={() => signOut()}
                  >
                    <ArrowLeftOnRectangleIcon width={22} />
                    Sign Out
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
