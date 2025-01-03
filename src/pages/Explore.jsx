import { Layout } from "@/layout/Layout"
import { Search } from "lucide-react"
import { useContext, useState } from "react"
import vinylomusic from '../assets/vinylomusic.png'
import { searchTracks } from "@/services/spotify"
import { AuthContext } from "@/context/Authcontext"
import { useNavigate } from "react-router-dom"
import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"

export const Explore = () => {

    // states
    const [search, setSearch] = useState('')
    const [tracks, setTracks] = useState([])

    const authContext = useContext(AuthContext)
    const { user, logoutContext } = authContext

    // navigation
    const navigate = useNavigate()

    let hasDate;

    if (user.dateInit != null){
        hasDate = true
    }else {
        hasDate = false
    }

    // functions
    const clickSearch = async () => {
        const token = localStorage.getItem('spotifyToken')
        try {
            if (token) {
                const tracks = await searchTracks(token, search)
                const mappedTracks = tracks.map((track) => {
                    const id = track.id
                    const name = track.name;
                    const album = track.album.images[0].url
                    const artists = track.artists.map((artist) => {
                      return {
                        name: artist.name
                      }
                    });
        
                    return {
                      id,
                      name,
                      album,
                      artists
                    }
                  })
                setTracks(mappedTracks);
            }
        }catch (error) {
            logoutContext()
        }
        
    }

    const handleTrack = (track) => {
        navigate('/song-detail', { state: { track } })
    }

    return (
        <Layout menuActiveItem={'explore'}>
            <div>
                {hasDate ? (
                <>
                <div className="flex justify-center items-center px-8 ">
                    <h1 className="text-2xl bg-gradient-to-r from-strong via-prim to-lightviolet bg-clip-text text-transparent flex-grow text-center">
                        Explore New Tracks
                    </h1>
                    
                </div>
                <div className="w-full flex mt-3 justify-center">
                    <input placeholder="Enter a Track Name" className="w-5/6 p-2 rounded-bl-lg rounded-tl-lg bg-slate-200 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="w-16 flex justify-center text-light rounded-tr-lg rounded-br-lg p-1 bg-slate-200"
                    onClick={clickSearch}
                    >
                        <Search size={32} className="text-strong"/>
                    </button>
                </div>
                {tracks.length > 0 ? (
                    <div className="w-full mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tracks.map((track) => (
                    <div
                    key={track.id}
                    className="flex items-center py-2 rounded-lg bg-light cursor-pointer 
                               border-2 border-transparent bg-gradient-to-br from-prim to-violetneon
                               shadow-[0_0_10px_2px_rgba(76,224,210,0.5),0_0_15px_5px_rgba(152,146,255,0.4)]"
                    onClick={() => handleTrack(track)}
                    >
                        <img src={track.album} alt={track.name} className="w-32 rounded-lg mx-2 h-32 object-cover" />
                        <div className="flex flex-col">
                        <h3 className="mt-2 mx-2 text-xl bg-gradient-to-r from-black to-dark bg-clip-text text-transparent">{track.name}</h3>
                        <div className="flex">
                            <h3 className="text-sm mx-2 whitespace-wrap overflow-hidden">
                            {track.artists.map((artist) => artist.name).join(', ')}
                            </h3>
                        </div>
                        </div>
                    </div>
                    ))}
                    </div>
                ):(
                    <div className="flex flex-col justify-center items-center h-96 ">
                    <img src={vinylomusic} className="h-32 w-32"/>
                    <h1 className="text-base text-prim mt-3">No tracks found, try another search</h1>
                    </div>
                )}
                </>
                ):(
                    <NoArtistsMessage
                        image={vinylomusic}
                        message={"Please asign a starting date for explore your favorite songs 😃"}
                        buttonText={"Profile"}
                        buttonAction={()=>navigate('/profile')}
                    />
                )}
            </div>
        </Layout>
    )
}