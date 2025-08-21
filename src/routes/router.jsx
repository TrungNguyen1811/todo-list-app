import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load component
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage/HomePage";
import { SignUp } from "../pages/SignUp/SignUp";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import { SignIn } from "@/pages/SignIn/SignIn";
import ProtectedRoute from "./protectedRoute";

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <ProtectedRoute>
          <HomeLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading page...</div>}>
            <Dashboard />
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
    path: "/sign-in",
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
