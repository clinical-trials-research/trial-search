import { Outlet } from "react-router-dom";

/**
 * Renders the main page where users can search for clinical trials.
 *
 * @returns Component representing the main page.
 */
export default function Root() {
  return (
    <div className="min-h-screen bg-slate-50 font-serif p-5">
      <h1 className="text-4xl">Trial Search</h1>
      <Outlet />
    </div>
  );
}
