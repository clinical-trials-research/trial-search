import { Link, Outlet } from "react-router-dom";

/**
 * Renders the main page where users can search for clinical trials.
 */
export default function Root() {
  return (
    <div className="min-h-screen bg-zinc-100 p-5 font-serif">
      <div className="my-5">
        <Link to={"/"}>
          <h1 className="text-3xl">Trial Search</h1>
        </Link>
        <ul>
          <Link className="hover:underline" to={"/about"}>
            About
          </Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
