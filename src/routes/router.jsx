import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy load component
import HomeLayout from "../layouts/HomeLayout";
import { SignUp } from "../pages/SignUp/SignUp";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import { SignIn } from "@/pages/SignIn/SignIn";
import Priority from "@/pages/Priority";
import ProtectedRoute from "./protectedRoute";
import TaskPage from "@/pages/TaskPage";
import AuthRoute from "./authRoute";

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
      {
        path: "/priority",
        element: (
          <Suspense fallback={<div>Loading page...</div>}>
            <Priority />
          </Suspense>
        ),
      },
      {
        path: "/tasks",
        element: (
          <Suspense fallback={<div>Loading page...</div>}>
            <TaskPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<div>Loading layout...</div>}>
        <AuthRoute>
          <SignUp />
        </AuthRoute>
      </Suspense>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <AuthRoute>
        <SignIn />
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
