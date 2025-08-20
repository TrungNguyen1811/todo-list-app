import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load component
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage/HomePage";
import { SignUp } from "../pages/SignUp/SignUp";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <HomeLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading page...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
