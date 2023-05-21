import Link from "next/link";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <h1>
          <Link className="logo" href={"/"}>
            Prompts App
          </Link>
        </h1>
      </div>
    </nav>
  );
};

export default Nav;
