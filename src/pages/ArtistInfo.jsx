import { awardsArtist, getArtist } from "@/services/artists";
import { getSongsById } from "@/services/songs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import vinylobronze from "@/assets/vinylos/vinylobronze.png";
import vinylogold from "@/assets/vinylos/vinylogold.png";
import vinylosilver from "@/assets/vinylos/vinylosilver.png";
import vinyloamber from "@/assets/vinylos/vinyloamber.png";

export const ArtistInfo = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        const fetchArtistInfo = async () => {
            const artistdata = await getArtist(id);
            setArtist(artistdata);
            const artistsongs = await getSongsById(id);
            setSongs(artistsongs);
            const artistawards = await awardsArtist(id);
            setAwards(artistawards);
        }
        fetchArtistInfo();
    },[])


    const formatFollowers = (followers) => {
        if (followers > 1000000) {
            return `${(followers/1000000).toFixed(1)} M`
        } else if (followers > 1000) {
            return `${(followers/1000).toFixed(1)} K`
        } else {
            return followers
        }
    }

    const getBackgroundColor = (rating) => {
        if (rating >= 9.5){
            return 'bg-[#0279B5] text-white'
        }
        else if(rating >= 8.5 && rating < 9.5){
            return 'bg-[#01b5a5]'
        }
        else if(rating >= 8 && rating < 8.5){
            return 'bg-[#01a56f] text-black'
        }
        else if(rating > 7 && rating < 8){
            return 'bg-[#4933ff]'
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
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-dark to-black">
            <nav className="h-20 bg-pome flex items-center">
                <div 
                    className="flex items-center lg:px-2 cursor-pointer"
                    onClick={() => navigate('/home')}
                >
                    <img 
                        src="/vinylo.png" 
                        className="w-10 h-10 mx-2 lg:mx-3" 
                        alt="Vinylo logo"
                    />
                    <h1 className="font-bold lg:text-xl text-prim">
                        Vinylo
                    </h1>
                </div>
            </nav>
            {artist &&
            <>
            <div className="flex flex-col lg:flex-row items-center w-full mt-8">
                <section className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
                    <img src={artist.photo} className="w-64 h-64 rounded-lg border-2 border-prim"/>
                </section>
                <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start px-6 mt-3 lg:mt-0">
                    <h1 className="text-3xl font-bold text-prim">{artist.name}</h1>
                    <div className="flex mt-2 items-center" >
                        <img src={artist.flag} className="w-10 h-10 rounded-full object-cover"/>
                        <h1 className="text-white text-lg font-bold px-3">{artist.country}</h1>
                    </div>
                    <div className="flex items-center text-white">
                        <h1 className="text-white text-lg font-bold mt-2 w-24">Followers:</h1>
                        <h1 className="text-white text-lg font-bold mt-2">{formatFollowers(artist.followers)}</h1>
                    </div>
                    
                    <p className="text-white text-lg font-bold mt-2">
                      Genres:  {JSON.parse(artist.genres.replace(/'/g, '"')).map(genre => genre).join(', ')}
                    </p>
                    <div className="flex text-prim text-lg mt-2 font-bold">
                        <h1 className="w-36">Current Position:</h1>
                        <h1>{artist.current_position}</h1>
                    </div>
                    <div className="flex text-prim text-lg mt-2 font-bold">
                        <h1 className="w-36">Best Position:</h1>
                        <h1>{artist.best_position}</h1>  
                    </div>
                    <p className="text-white text-sm mt-2">
                        from {artist.start_date_best_position} to {artist.end_date_best_position}
                    </p>
                </section>
                
            </div>
            <section className="flex items-center justify-center bg-dark my-6 w-2/3 lg:w-1/6 gap-4 border-violetneon border-2 rounded-lg">
                <div className="flex flex-col items-center p-2">
                    <h1 className="text-white my-2">Points</h1>
                    <div className="text-black flex justify-center items-center bg-strong w-16 h-16 text-3xl font-bold rounded-lg">{artist.points}</div>
                </div>
                <div className="flex flex-col items-center p-2">
                    <h1 className="text-white my-2">Rating</h1>
                    <div className={`w-16 h-16 text-3xl font-bold flex items-center justify-center rounded-lg ${getBackgroundColor(artist.rating)}`}>
                        {Number.isInteger(artist.rating) ? artist.rating : artist.rating.toFixed(1)}
                    </div>
                </div>
            </section>
            <h1 className="mt-6 mb-3 text-3xl text-prim">Awards</h1>
            <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
                <div className="bg-dark flex flex-col items-center justify-center p-3 rounded-lg border-2 border-[#cd7f32]">
                    <img src={vinylobronze} className="w-20 h-20"/>
                    <h1 className="text-white text-xl font-bold text-center p-2">Bronze Awards {awards.bronze}</h1>
                </div>
                {awards.silver && awards.silver.length > 0 && (
                    <div className="flex flex-col justify-center">
                        {awards.silver.map((award) => (
                            <div key={award.id} className="bg-dark flex flex-col items-center justify-center p-3 rounded-lg border-2 border-[#bebebe]">
                                <img src={vinylosilver} className="w-20 h-20" alt="Silver Award"/>
                                <h1 className="text-white text-xl font-bold text-center p-2">{award.description}</h1>
                            </div>
                        ))}
                    </div>
                )}
                {awards.amber && awards.amber.length > 0 && (
                    <div className="flex flex-col justify-center">
                        {awards.amber.map((award) => (
                            <div key={award.id} className="bg-dark flex flex-col items-center justify-center p-3 rounded-lg border-2 border-[#f1ba11]">
                                <img src={vinyloamber} className="w-20 h-20" alt="Gold Award"/>
                                <h1 className="text-white text-xl font-bold text-center p-2">{award.description}</h1>
                            </div>
                        ))}
                    </div>
                )}
                {awards.gold && awards.gold.length > 0 && (
                    <div className="flex flex-col justify-center">
                        {awards.gold.map((award) => (
                            <div key={award.id} className="bg-dark flex flex-col items-center justify-center p-3 rounded-lg border-2 border-[#cda732]">
                                <img src={vinylogold} className="w-20 h-20" alt="Gold Award"/>
                                <h1 className="text-white text-xl font-bold text-center p-2">{award.description}</h1>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <h1 className="mt-6 mb-3 text-3xl text-prim">Songs</h1>
            <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
                
                {songs.map((song) => (
                    <div key={song.id} className="group flex flex-col justify-center items-center border-2 border-strong py-2 rounded-lg bg-black shadow-md  text-white cursor-pointer "
                    onClick={() => gotoVideo(song.youtube_id, song.name)}
                    >
                        <img src={song.album} alt={song.name} className="w-32 h-32 object-cover rounded-lg border-2 border-violetneon"/>
                        <h1 className="text-prim text-xl font-bold text-center mt-1 ">{song.name}</h1>
                    </div>
                ))}
            </div>
            </>
            }
        </div>
    );
}