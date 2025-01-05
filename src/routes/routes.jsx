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
import { Awards } from "@/pages/Awards";
import { Songs } from "@/pages/Songs";
import { History } from "@/pages/History";
import { SongDetail } from "@/pages/SongDetail";
import { ArtistMonth } from "@/pages/ArtistMonth";
import { DetailRanking } from "@/pages/DetailRanking";
import { Stats } from "@/pages/Stats";
import { ArtistInfo } from "@/pages/ArtistInfo";

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
  },
  {
    path: "/awards",
    element: <ProtectedRoute children={<Awards/>}/>
  },
  {
    path: "/songs",
    element: <ProtectedRoute children={<Songs/>}/>
  },
  {
    path: "/history",
    element: <ProtectedRoute children={<History/>}/>
  },
  {
    path: "/song-detail",
    element: <ProtectedRoute children={<SongDetail/>}/>
  },
  {
    path: "/artist-month",
    element: <ProtectedRoute children={<ArtistMonth/>}/>
  },
  {
    path: "/rank/:period",
    element: <ProtectedRoute children={<DetailRanking/>}/>
  },
  {
    path: "/stats",
    element: <ProtectedRoute children={<Stats/>}/>
  },
  {
    path: "/artist/:id",
    element: <ProtectedRoute children={<ArtistInfo/>}/>
  }
])