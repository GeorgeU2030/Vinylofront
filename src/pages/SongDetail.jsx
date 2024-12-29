import { GradualSpacingDemo } from "@/components/magic/TextGradual"
import { getTrack } from "@/services/spotify"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const SongDetail = () => {

    // navigation
    const location = useLocation()
    const navigate = useNavigate()

    // values and states
    const track = location.state?.track

    const [detailTrack, setDetailTrack] = useState(null)

    // effects
    useEffect(() => {
        if(track){
            const token = localStorage.getItem("spotifyToken")
            const id = track.id
            getTrack(token, id).then(data => {
                setDetailTrack(data)
            })
        }
    }, [track])
    
    console.log(detailTrack)

    if(!location.state){
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <h1 className="text-white">Track not found</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <nav
            className="h-20 bg-pome flex items-center"
            >
            <div className="flex items-center lg:px-2 cursor-pointer"
            onClick={()=>navigate('/home')}
            >
                <img src="vinylo.png" className="w-10 h-10 mx-2 lg:mx-3" />
                <h1 className="font-bold lg:text-xl text-prim">
                Vinylo
                </h1>
            </div>
            </nav>
            {detailTrack && (
            <div className="flex flex-col w-full bg-gradient-to-t from-black via-black to-strong items-center justify-center">
                <section className="flex flex-row w-full">
                    <section className="w-1/2 flex flex-col items-center justify-center py-6">
                        <img src={detailTrack.album.images[0].url} className="w-64 h-64 rounded-md border-2 border-violetneon"/>
                        <h1 className="text-white text-2xl mt-4 mb-2">{detailTrack.name}</h1>
                        <GradualSpacingDemo content={`Release in ${detailTrack.album.release_date}`} />
                        <p className="text-prim mt-4">Rate this Song 😃</p>
                        <div>
                            
                        </div>
                    </section>
                </section>
            </div>
            )}
        </div>
    )
}