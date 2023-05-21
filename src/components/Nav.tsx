import Link from "next/link";
import { CpuChipIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <h1>
          <Link className="logo" href={"/"}>
            Prompts App
          </Link>
        </h1>
        <Link
          href="/prompt-create"
          className="btn-default flex gap-2 items-center"
        >
          <CpuChipIcon width={16} />
          Create Prompt
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
