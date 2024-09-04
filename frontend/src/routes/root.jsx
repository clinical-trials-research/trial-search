import { Outlet } from "react-router-dom";

/**
 * Renders the main page where users can search for clinical trials.
 *
 * @returns Component representing the main page.
 */
export default function Root() {
  return (
    <div className="min-h-screen bg-zinc-100 p-5 font-serif">
      <h1 className="mx-10 my-5 text-3xl">Trial Search</h1>
      <Outlet />
    </div>
  );
}
