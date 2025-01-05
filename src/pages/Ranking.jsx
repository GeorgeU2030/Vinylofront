import { Layout } from "@/layout/Layout"
import { useNavigate } from "react-router-dom"
import ranking from "../assets/ranking.png"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/Authcontext"
import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"
import { rankingArtists } from "@/services/artists"

export const Ranking = () => {

    // context
    const authContext = useContext(AuthContext)

    const { user } = authContext

    // navigation
    const navigate = useNavigate()

    // values and states
    let hasDate;

    if (user.dateInit != null){
        hasDate = true
    }else {
        hasDate = false
    }

    // states
    const [artists, setArtists] = useState([])

    // effects
    useEffect(() => {
        const fetchArtists = async () => {
            const response = await rankingArtists()
            setArtists(response)
        }
        fetchArtists()
    },[])

    return (
        <Layout menuActiveItem={'ranking'}>
            {artists.length > 0 ?(
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center my-4 text-prim">Top Artist</h1>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    {artists.length > 1 &&
                    <section className="flex flex-col border-2 border-[#bebebe] rounded-lg mt-6">
                        <img src={artists[1].photo} className="w-48 h-52 rounded-lg p-1"/>
                        <h1 className="text-prim text-xl font-bold text-center">{artists[1].name}</h1>
                    </section>
                    }
                    {artists.length > 0 &&
                    <section className="flex flex-col border-2 border-[#f1ba11] rounded-lg mt-2">
                        <img src={artists[0].photo} className="w-60 h-64 rounded-lg p-1"/>
                        <h1 className="text-prim text-xl font-bold text-center">{artists[0].name}</h1>
                        
                    </section>
                    }
                    {artists.length > 2 &&
                    <section className="flex flex-col border-2 border-[#cd7f32] rounded-lg mt-6">
                        <img src={artists[2].photo} className="w-40 h-44 rounded-lg p-1"/>
                        <h1 className="text-prim text-xl font-bold text-center">{artists[2].name}</h1>
                    </section>
                    }
                </div>

                <div className="flex flex-col items-center my-12 w-full">
                    <h1 className="text-prim text-center text-3xl">Complete Ranking</h1>
                    {artists.map((artist, index)=> {
                        return (
                            <div key={artist.id} className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4 w-full lg:w-3/4 bg-dark rounded-lg p-2
                            border-2 border-prim cursor-pointer
                            "
                            onClick={()=>navigate(`/artist/${artist.id}`)}
                            >
                                <h1 className="text-white text-center text-lg">{index+1}</h1>
                                <img src={artist.photo} className="w-28 h-28 rounded-lg p-1"/>
                                <h1 className="text-white text-xl text-center md:!text-left font-bold w-1/2">{artist.name}</h1>
                                <div className="flex flex-col items-center justify-center w-24">
                                    <p className="text-white text-sm font-bold text-center">PTS</p>
                                    <p className="text-white text-xl font-bold text-center">{artist.points}</p>
                                </div>
                                <h1 className="text-white text-sm font-bold w-32 text-center">{artist.country}</h1>
                                <img src={artist.flag} className="rounded-full h-12 w-12 object-cover"/>
                            </div>
                        )
                    })}
                </div>
            </div>
            ):(
            hasDate ? (
            <NoArtistsMessage
                image={ranking}
                message={"You don't have any artist yet 😢"}
                buttonText={"Explore"}
                buttonAction={()=>navigate('/explore')}
            />
            ):(
            <NoArtistsMessage
                image={ranking}
                message={"Please asign a starting date for add your song and artists 😃"}
                buttonText={"Profile"}
                buttonAction={()=>navigate('/profile')}
            />
            )
            )} 
        </Layout>
    )
}