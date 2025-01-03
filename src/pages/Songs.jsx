import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"
import { Layout } from "@/layout/Layout"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import sound from "@/assets/sound.png"
import { getAllSongs } from "@/services/songs"

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

    console.log("songs",songs)

    return (
        <Layout menuActiveItem={'songs'}>
            {songs && songs.length > 0 ?(
            <div className="flex flex-col items-center">
                <h1 className="text-prim text-2xl py-4">Your Songs</h1>
                {songs.map((song) => (
                    <div key={song.id} className="flex items-center justify-center w-3/5 h-36 bg-cyan-600 border-2 border-violetneon rounded-lg my-2">
                        <div className="flex items-center justify-end px-6 h-full">
                            <img src={song.album} alt={song.title} className="w-28 h-28 rounded-md border-2 border-prim"/>
                        </div>
                        <div className="flex justify-between w-1/2 h-full">
                        <div className="flex flex-col items-start justify-center h-full">
                            <p className="text-lg font-bold text-white">{song.name}</p>
                            <p className="text-sm text-white">
                                {song.artists.map(artist => artist.name).join(', ')}
                            </p>
                        </div>
                        <div className="flex flex-col items-start justify-center h-full px-4">
                            <p className="text-base text-white ">Release in</p>
                            <p className="text-base text-white ">{song.release_date}</p>
                        </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full w-64">
                            <p className="text-sm text-white">Week {song.week}</p>
                            <p className="text-sm text-white">{song.start_date} - {song.end_date}</p>
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