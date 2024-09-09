import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import AboutPage from "./routes/AboutPage.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import HomePage from "./routes/HomePage.jsx";
import SearchPage from "./routes/SearchPage.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <SearchPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
