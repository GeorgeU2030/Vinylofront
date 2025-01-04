import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"
import { Layout } from "@/layout/Layout"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import sound from "@/assets/sound.png"
import { getAllSongs } from "@/services/songs"
import vinyloroyal from "@/assets/vinylos/vinyloroyal.png"
import vinyloemerald from "@/assets/vinylos/vinyloemerald.png"
import vinylosky from "@/assets/vinylos/vinylosky.png"
import vinyloplatinum from "@/assets/vinylos/vinyloplatinum.png"

export const Songs = () => {

    // states
    const [songs, setSongs] = useState([])

    // navigation
    const navigate = useNavigate()

    // effects
    useEffect(() => {
        const fetchSongs = async () => {
            const songs = await getAllSongs()
            setSongs(songs)
        }
        fetchSongs()
    },[])

    const getBorderColor = (rating) => {
        if (rating == 10){
            return 'border-2 border-[#0279B5]'
        }
        else if(rating == 9){
            return 'border-2 border-[#01b5a5]'
        }
        else if(rating == 8){
            return 'border-2 border-[#01a56f]'
        }
        else if(rating == 7){
            return 'border-2 border-[#4933ff]'
        }
    }

    const getImageRating = (rating) => {
        if (rating == 10){
            return vinyloplatinum
        }
        else if(rating == 9){
            return vinylosky
        }
        else if(rating == 8){
            return vinyloemerald
        }
        else if(rating == 7){
            return vinyloroyal
        }
    }

    const gotoVideo = (videoId, songTitle) => {
        const video = {
            id: videoId,
            title: songTitle
        }
        navigate('/video', { state: { video } })
    }

    return (
        <Layout menuActiveItem={'songs'}>
            {songs && songs.length > 0 ?(
            <div className="flex flex-col items-center">
                <h1 className="text-prim text-2xl py-4">Your Songs</h1>
                {songs.map((song) => (
                    <div key={song.id} className={`flex flex-col lg:flex-row items-center justify-center w-full lg:w-2/3 lg:h-36 bg-prim rounded-lg my-2 cursor-pointer ${getBorderColor(song.rating)}`}
                    onClick={() => gotoVideo(song.youtube_id, song.name)}
                    >
                        <div className="flex items-center justify-center lg:justify-end lg:px-6 h-full w-full lg:w-1/4">
                            <img src={song.album} alt={song.title} className="w-28 h-28 rounded-md border-2 border-strong"/>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full lg:w-2/3 h-full">
                        <div className="flex flex-col items-center lg:items-start justify-center h-full w-72">
                            <p className="text-lg font-bold text-black">{song.name}</p>
                            <p className="text-sm text-black ">
                                {song.artists.map(artist => artist.name).join(', ')}
                            </p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start justify-center h-full lg:px-4 w-48 lg:w-28">
                            <p className="text-base text-black">Release in</p>
                            <p className="text-base text-black">{song.release_date}</p>
                        </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full w-72 lg:w-72">
                            <p className="text-sm text-black">Week {song.week}</p>
                            <p className="text-sm text-black">{song.start_date} - {song.end_date}</p>
                        </div>
                        <div className="flex my-2 lg:mt-0 items-center justify-center h-full w-48 px-4">
                            <img src={getImageRating(song.rating)} alt="rating" className="w-14 h-14 p-1 border border-dark rounded-lg"/>
                            <div className="flex flex-col items-center justify-center w-32">
                                <p className="text-sm text-black">Rate</p>
                                <p className="text-lg text-black">{song.rating}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            ):(
            <NoArtistsMessage
                image={sound}
                message={"You don't have any song yet 😢"}
                buttonText={"Explore"}
                buttonAction={()=>navigate('/explore')}
            />
            )}
        </Layout>
    )
}