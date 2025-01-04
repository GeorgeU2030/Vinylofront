import { Layout } from "@/layout/Layout"
import trophy from "../assets/trophy.png"
import { AuthContext } from "@/context/Authcontext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"
import { rankingAwards } from "@/services/artists"
import awards from "@/assets/award.png"

export const Awards = ()=> {

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

    const [artists, setArtists] = useState([])

    // effects

    useEffect(() => {
        const fetchArtist = async () => {
            const response = await rankingAwards()
            setArtists(response)
        }   
        fetchArtist()
    },[])


    return (
        <Layout menuActiveItem={'awards'}>
            {artists.length > 0 ?(
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center my-4 text-prim">Awards Artists</h1>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    <section className="flex flex-col border-2 border-[#f1ba11] rounded-lg cursor-pointer">
                        <img src={artists[0].photo} className="w-60 h-64 rounded-lg p-1"/>
                        <h1 className="text-prim text-xl font-bold text-center">{artists[0].name}</h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <img src={awards} className="w-10 h-10"/>
                            <h1 className="text-prim text-2xl font-bold text-center">{artists[0].awards.length}</h1>
                        </div>
                    </section>
                    {artists.length > 1 &&
                    <section className="flex flex-col border-2 border-[#bebebe] rounded-lg cursor-pointer">
                        <img src={artists[1].photo} className="w-60 h-64 rounded-lg p-1"/>
                        <h1 className="text-prim text-xl font-bold text-center">{artists[1].name}</h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <img src={awards} className="w-10 h-10"/>
                            <h1 className="text-prim text-2xl font-bold text-center">{artists[1].awards.length}</h1>
                        </div>
                    </section>
                    }
                    {artists.length > 2 &&
                    <section className="flex flex-col border-2 border-[#cd7f32] rounded-lg cursor-pointer">
                        <img src={artists[2].photo} className="w-60 h-64 rounded-lg p-1"/>
                        <h1 className="text-prim text-xl font-bold text-center">{artists[2].name}</h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <img src={awards} className="w-10 h-10"/>
                            <h1 className="text-prim text-2xl font-bold text-center">{artists[2].awards.length}</h1>
                        </div>
                    </section>
                    }
                </div>
                {artists.length > 3 &&
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
                    {artists.slice(3).map((artist) => (
                            <div key={artist.id} className="group flex flex-col justify-center items-center border-2 border-pome py-2 rounded-lg bg-gradient-to-r from-strong to-violetneon cursor-pointer shadow-md hover:bg-gradient-to-r hover:from-prim hover:to-prim text-white">
                                <img src={artist.photo} alt={artist.name} className="w-36 h-40 object-cover rounded-lg border-2 border-lightviolet"/>
                                <h1 className="text-black text-xl font-bold text-center mt-1">{artist.name}</h1>
                                <div className="flex items-center justify-center mt-2 gap-2">
                                    <img src={awards} className="w-10 h-10"/>
                                    <h1 className="text-black text-xl font-bold text-center">{artist.awards.length}</h1>
                                </div>
                            </div>
                    ))}
                </div>
                }
            </div>
            ):(
            hasDate ? (
            <NoArtistsMessage
                image={trophy}
                message={"You don't have any artist yet 😢"}
                buttonText={"Explore"}
                buttonAction={()=>navigate('/explore')}
            />
            ):(
            <NoArtistsMessage
                image={trophy}
                message={"Please asign a starting date for add your song and artists 😃"}
                buttonText={"Profile"}
                buttonAction={()=>navigate('/profile')}
                />
            )
            )} 
        </Layout>
    )
}