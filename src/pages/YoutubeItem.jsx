import { YoutubeComponent } from "@/components/youtube/YoutubeComponent"
import { useLocation, useNavigate } from "react-router-dom"
import { Music } from "lucide-react"

export const YoutubeItem = () => {

    // navigation
    const navigate = useNavigate()
    const location = useLocation()

    const video = location.state?.video

    console.log(location.state.video)
    if(!video){
        return (
            <div>
                <h1 className="text-white">Video not found</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-dark to-black">
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
            <div className="flex flex-col flex-grow w-full bg-gradient-to-t from-black via-dark to-strong items-center justify-center">
                <YoutubeComponent videoId={video.id} />
                <div className="w-11/12 sm:w-[82%] lg:w-[56%] bg-prim mt-2 rounded-lg flex flex-col sm:flex-row  justify-between border-2 border-violetneon">
                    <h1 className="text-base text-center sm:text-left sm:text-xl px-4 py-2 sm:my-3">{video.title}</h1>
                    <div className="flex justify-center items-center">
                    <button className="bg-violetneon border-2 border-lightviolet rounded-lg px-6 py-2 flex gap-2 my-1 sm:my-3 mx-1 hover:bg-strong text-white hover:border-violetneon"
                    onClick={()=>navigate('/explore')}
                    >
                    <Music/> Explore
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}