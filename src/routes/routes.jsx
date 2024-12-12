import { createBrowserRouter } from "react-router-dom";
import { Landing } from "@/pages/Landing";
import { SignUp } from "@/pages/auth/Signup";
import { Login } from "@/pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  }
])