import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import OnboardingPage from "@/pages/OnboardingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignInPage /> },
      {
        path: "signup",
        children: [
          { index: true, element: <SignUpPage /> },
          { path: "onboarding", element: <OnboardingPage /> }
        ]
      },
    ],
  },
]);
