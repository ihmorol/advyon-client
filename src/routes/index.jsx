import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);
