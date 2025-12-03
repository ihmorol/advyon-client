import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";

import AuthLayout from "@/layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage /> },
        ],
      },
    ],
  },
]);
