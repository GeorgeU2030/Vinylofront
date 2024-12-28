import { createBrowserRouter } from "react-router-dom";
import { Landing } from "@/pages/Landing";
import { SignUp } from "@/pages/auth/Signup";
import { Login } from "@/pages/auth/Login";
import { Home } from "@/pages/Home";
import { ProtectedRoute } from "./security/ProtectedRoute";
import { YoutubeItem } from "@/pages/YoutubeItem";
import { Explore } from "@/pages/Explore";
import { Profile } from "@/pages/Profile";
import { Ranking } from "@/pages/Ranking";

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
  },
  {
    path: "/home",
    element: <ProtectedRoute children={<Home/>} />
  },
  {
    path: "/video",
    element: <ProtectedRoute children={<YoutubeItem/>}/>
  },
  {
    path: "/explore",
    element: <ProtectedRoute children={<Explore/>} />
  },
  {
    path: "/profile",
    element: <ProtectedRoute children={<Profile/>}/>
  },
  {
    path: "/ranking",
    element: <ProtectedRoute children={<Ranking/>}/>
  }
])