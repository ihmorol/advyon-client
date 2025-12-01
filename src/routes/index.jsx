import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import AdvyonLoginPage from "@/pages/auth/AdvyonLoginPage";
import AdvyonSignUpPage from "@/pages/auth/AdvyonSignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <AdvyonLoginPage /> },
      { path: "signup", element: <AdvyonSignUpPage /> },
    ],
  },
]);
