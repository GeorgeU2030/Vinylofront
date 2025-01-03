import { GradualSpacingDemo } from "@/components/magic/TextGradual"
import { getArtist, getTrack } from "@/services/spotify"
import { useContext, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import vinyloroyal from "@/assets/vinylos/vinyloroyal.png"
import vinyloemerald from "@/assets/vinylos/vinyloemerald.png"
import vinylosky from "@/assets/vinylos/vinylosky.png"
import vinyloplatinum from "@/assets/vinylos/vinyloplatinum.png"
import { addSong, getLastWeek } from "@/services/songs"
import { AuthContext } from "@/context/Authcontext"
import { searchVideoandGetId } from "@/services/youtube"
import { YoutubeVideo } from "@/components/youtube/YoutubeVideo"
import { CoolModeCustom } from "@/components/magic/CoolMode"
import { getCountryController } from "@/services/musicbrainz"
import { restCountry } from "@/services/restcountry"
import { getArtistMonth, updateArtists, updateCurrentDate } from "@/services/artists"


export const SongDetail = () => {

    // context
    const authContext = useContext(AuthContext)

    const { user, logoutContext, updateUserContext } = authContext

    // navigation
    const location = useLocation()
    const navigate = useNavigate()

    // values and states
    const weekRef = useRef(null)

    const track = location.state?.track

    const [detailTrack, setDetailTrack] = useState(null)
    const [rating, setRating] = useState("")
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [currentDate, setCurrentDate] = useState(null)
    const [videoId, setVideoId] = useState('')
    const [artists, setArtists] = useState([])
    const [message, setMessage] = useState('')
    const [allArtistLoaded, setAllArtistLoaded] = useState(false)

    // effects
    useEffect(() => {
        if(track){
            const token = localStorage.getItem("spotifyToken")
            const id = track.id
            getTrack(token, id).then(data => {
                setDetailTrack(data)
                const artistPromises = data.artists.map(artist => getArtist(token, artist.id))
                
                
                Promise.all(artistPromises).then(artistsData => {
                    setArtists(prev => {
                        const newArtists = artistsData.filter(data => 
                            !prev.some(item => item.id === data.id)
                        );
                        return [...prev, ...newArtists];
                    });
                    setAllArtistLoaded(true);
                });
            })
            .catch(error => {
                logoutContext();
                navigate('/login');
            });
   
            const searchTerm = `${track.name} ${track.artists[0].name}`;
            searchVideoandGetId(searchTerm).then(data => {
                setVideoId(data);
            });
        }
        getLastWeek().then(data => {
            weekRef.current = data;
        });
        calculateDates();
    }, [track]);
   
    useEffect(() => {
        if(allArtistLoaded && artists.length > 0){
            
            if (!artists.some(artist => artist.country)){
                getCountryArtist();
            }
        }
    }, [allArtistLoaded, artists]);
    

    if(!location.state){
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <h1 className="text-white">Track not found</h1>
            </div>
        )
    }

    // functions
    const calculateDates = () =>{
        // start date from the user
        const start_date = user?.currentDate
        
        // set the start date to type date
        const startDate_obj = new Date(start_date)
        setStartDate(start_date)

        // calculate the end date and set it to type date
        startDate_obj.setDate(startDate_obj.getDate() + 6)
        const end_date = startDate_obj.toISOString().split('T')[0]
        setEndDate(end_date)
        
        // calculate the current date and set it to type date
        const newDate_obj = new Date(start_date)
        newDate_obj.setDate(newDate_obj.getDate() + 7)
        const newDate = newDate_obj.toISOString().split('T')[0]
        setCurrentDate(newDate)
    }

    const handleButtonClick = (rating) => {
        setRating(rating)
        setMessage('')
    }

    const getCountryArtist = async () => {
        if(artists.length === 0){
            return
        }
        
        try {
            const updatedArtists = await Promise.all(
                artists.map(async (artist) => {
                    
                    const country = await getCountryController(artist.name);
                    
                    const flag = await restCountry(country);
                    
                    return {
                        ...artist,
                        country: country,
                        flag: flag
                    };
                })
            );

            setArtists(updatedArtists);
            
        } catch (error) {
            console.error('Error getting country data:', error);
        }
    }

    const sendData = async () => {
        if(rating === ''){
            setMessage("Please rate the song first")
            return
        }else {
            
            const form = {
                "name": detailTrack.name,
                "rating": rating,
                "start_date": startDate,
                "end_date": endDate,
                "week": weekRef.current,
                "release_date": detailTrack.album.release_date,
                "album": detailTrack.album.images[0].url,
                "youtube_id": videoId,
                "profile": user.id,
                "artists": artists.map(artist => {
                    return {
                        "name": artist.name,
                        "photo": artist.images[0].url,
                        "country": artist.country,
                        "flag": artist.flag,
                        "followers": artist.followers.total,
                        "genres": artist.genres.slice(0, 3),
                    }
                })
            }

            const updateArtistsForm = {
                week: weekRef.current,
                start_date: startDate,
                end_date: endDate,
                artists: artists,
                rating: rating
            }
            addSong(form).then(data => {
                updateCurrentDate({
                    "currentDate": currentDate,
                    "profile": user.id
                }).then(data => {
                    updateUserContext(data.user)
                    updateArtists(updateArtistsForm)
                })
            })
            if(isLastWeekMonth()){
                getArtistMonth(startDate)
            }
        }
    }

    const isLastWeekMonth = () => {
        const beginDate = new Date(startDate)
        const year = beginDate.getFullYear()
        const month = beginDate.getMonth() + 1

        const daysInMonth = new Date(year, month, 0).getDate()

        const upperLimit = parseInt(daysInMonth,10) - 3
        const lowerLimit = upperLimit - 6

        const day = beginDate.getDate()
        console.log("day",day)

        if (day >= lowerLimit && day <= upperLimit){
            return true
        } else {
            return false
        }
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
            <div className="flex flex-col flex-grow w-full bg-gradient-to-t from-black via-black to-strong items-center justify-center">
                <section className="flex md:flex-row flex-col w-full ">
                    <section className="w-full md:w-1/2 flex flex-col items-center justify-center py-6 ">
                        <img src={detailTrack.album.images[0].url} className="w-64 h-64 rounded-md border-2 border-violetneon"/>
                        <h1 className="text-white text-2xl mt-4 mb-2">{detailTrack.name}</h1>
                        <GradualSpacingDemo content={`Release in ${detailTrack.album.release_date}`} />
                        <p className="text-prim mt-4 mb-2">Rate this Song 😃</p>
                        {rating === '' ? (
                            <p className="text-white text-sm">No Rated Yet</p>
                        ):(
                            <p className="text-white text-base">{rating}</p>
                        )}
                        <div className="flex w-full justify-center mt-4 gap-3">
                            <button onClick={()=>handleButtonClick('7')}>
                                <img src={vinyloroyal} className={`w-14 h-14 rounded-md border-1 border-[#4933ff] p-2 ${rating === '7' ? 'bg-dark' : ''}`}/>
                            </button>
                            <button onClick={()=>handleButtonClick('8')}> 
                                <img src={vinyloemerald} className={`w-14 h-14 rounded-md border-1 border-[#01a56f] p-2 ${rating === '8' ? 'bg-dark' : ''}`}/>
                            </button>
                            <button onClick={()=>handleButtonClick('9')}>
                                <img src={vinylosky} className={`w-14 h-14 rounded-md border-1 border-[#01b5a5] p-2 ${rating === '9' ? 'bg-dark' : ''}`}/>
                            </button>
                            <button onClick={()=>handleButtonClick('10')}>
                                <img src={vinyloplatinum} className={`w-14 h-14 rounded-md border-1 border-[#0279B5] p-2 ${rating === '10' ? 'bg-dark' : ''}`}/>
                            </button>
                        </div>
                        <p className="text-white mt-4 text-lg">Week {weekRef.current}</p>
                        <div className="flex mt-3 gap-3 items-center">
                            <input className="rounded-lg w-32 py-2 border-1 border-violetneon bg-prim text-center" value={startDate} disabled/>
                            <p className="text-white">-</p>
                            <input className="rounded-lg w-32 py-2 border-1 border-violetneon bg-prim text-center" value={endDate} disabled/>
                        </div>
                    </section>
                    <section className="w-full md:w-1/2 flex flex-col items-center justify-center py-6 px-1">
                        <YoutubeVideo videoId={videoId}/>
                        <div className="flex mt-4 gap-3 mb-8">
                            {artists.map(artist => (
                                <div className="flex flex-col items-center justify-center mt-4" key={artist.id}> 
                                    <img src={artist.images[0].url} className="w-28 h-28 rounded-md border-2 border-violetneon"/>
                                    <h1 className="text-white text-sm mt-4">{artist.name}</h1>
                                </div>
                            ))}
                        </div>
                        {message && (
                            <p className="text-slate-100 pb-3">{message}</p>
                        )}
                        <CoolModeCustom content="Add Song" onClick={sendData}/>
                    </section>
                </section>
            </div>
            )}
        </div>
    )
}