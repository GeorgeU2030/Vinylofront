import { Header } from "../components/Header";
import topartist from "../assets/topartists.png";
import { CoolModeCustom } from "@/components/magic/CoolMode";
import { useNavigate } from "react-router-dom";

export function Landing(){
  
  const navigate = useNavigate()
  
  const gotoSignup = () => { 
    navigate("/signup")
  }
  
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <section className="flex flex-col items-center w-full">
        <img src="https://es.rollingstone.com/wp-content/uploads/2024/07/Spotify-retira-musica-de-artistas-rusos-que-apoyan-la-guerra-en-Ucrania.jpg" className="w-11/12 sm:w-2/3 h-72 sm:h-96 rounded-lg"/>
        <div className="w-2/3 text-center">
        <h1 className="text-prim mt-6 text-lg font-normal">Discover and rate the music you love with Vinylo 🎵</h1>
        <p className="text-white font-normal">
        Explore songs, enjoy YouTube videos, and rate your favorites with our unique vinylo system. Dive into your favorite artist stats and enjoy a personalized music experience, powered by Spotify and YouTube integration. With Vinylo by Osprex, music has never been this interactive!
        </p>
        </div>
      </section>
      <section className="flex flex-col items-center w-full">
        <div className="w-11/12 sm:w-1/3">
          <img src={topartist} className="rounded-lg mt-12"/>
        </div>
        <h1 className="text-lightviolet text-lg font-normal mt-6">Your artists, your champions 🏆</h1>
        <p className="font-normal text-white w-2/3 text-center">
        Discover who leads your musical world with the trophies and points Vinylo assigns to your favorite artists. Based on your ratings and stats, celebrate the top 10 most played on Spotify and turn them into the true icons of your playlist. Make your love for music shine with every featured artist!
        </p>
      </section>
      <div className="flex justify-center mt-8 pb-16">
        <CoolModeCustom onClick={gotoSignup} content='Get Started'/>
      </div>
    </div>
  )
}