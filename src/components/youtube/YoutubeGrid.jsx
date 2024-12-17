import { getChannelDetails, getMainVideos } from "@/services/youtube"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const YoutubeGrid = () => {

    // navigation
    const navigate = useNavigate()

    // states
    const [videos, setVideos] = useState([])

    // fetch data
    useEffect(() => {
        fetchVideos()
    },[])

    const fetchVideos = async () => {
        try{
            const videos = await getMainVideos()
            const mappedVideos = await Promise.all(videos.map(async (video) => {
                const channelId = video.snippet.channelId;
                const channelDetails = await getChannelDetails(channelId);
                const channelImage = channelDetails.snippet.thumbnails.default.url;
      
                return {
                    id: video.id,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnail: video.snippet.thumbnails.high.url,
                    channelTitle: video.snippet.channelTitle,
                    channelImage 
                };
              }));

            setVideos(mappedVideos)
            
        }catch(error){
            console.error(`Error fetching videos ${error}`)
        }
    }

    return (
        <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.map((video) => (
                <div key={video.id} className="flex flex-col justify-center items-center border-2 border-pome py-2 rounded-lg bg-gradient-to-r from-strong to-violetneon cursor-pointer shadow-md"
                onClick={() => handleVideoClick(video)}
                >
                <img src={video.thumbnail} alt={video.title} className="w-90 object-cover" />
                <div className="flex items-center justify-center mt-2">
                    <img src={video.channelImage} alt={'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'} className="w-10 h-10 rounded-full" 
                    onError={(e) => (e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/1144/1144760.png")} />
                    <h3 className="mt-2 text-sm text-white text-center mx-2">{video.channelTitle}</h3>
                </div>
                </div>
            ))}
        </div>
    )
}