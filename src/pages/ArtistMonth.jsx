import { CoolModeCustom } from "@/components/magic/CoolMode";
import { addMonthAward, getArtistMonth } from "@/services/artists";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export const ArtistMonth = () => {

    // navigation
    const location = useLocation();
    const navigate = useNavigate();

    // values
    const startDate = location.state?.startDate;
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [message, setMessage] = useState(null);
    const [period, setPeriod] = useState(null);

    // effects

    useEffect(()=>{
        const fetchArtistMonth = async () => {
            const response = await getArtistMonth(startDate);
            setArtists(response.artists);
            setPeriod(response.month);  
        };
        fetchArtistMonth();
    },[startDate])

    
    if(!location.state){
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <h1 className="text-white">There no artist for select</h1>
            </div>
        )
    }

    // functions
    const sendArtist = () => {
        if(selectedArtist){
            const infoAward = {
                id: selectedArtist.id,
                period: period
            }
            
            addMonthAward(infoAward).then((data)=> {
                toast.success('Award added successfully')
                navigate('/home')
            })
        }
        else {
            setMessage("You must select an artist")
        }
    }

    const selectArtist = (artist) => {
        setSelectedArtist(artist)
        setMessage(null)
    }

    return (
        <div className="min-h-screen w-screen flex flex-col items-center py-6">
            <h1 className="text-prim text-2xl">Artists for the month</h1>
            {artists.length > 0 ? (
            <>
                <div className="w-10/12 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                    {artists.map((artist) => (
                        <div key={artist.id} className={`group flex flex-col justify-center items-center border-2 border-pome py-2 rounded-lg cursor-pointer shadow-md text-white ${
                            selectedArtist?.id === artist.id ? 'bg-gray-500' : 'bg-gradient-to-r from-strong to-violetneon hover:bg-gradient-to-r hover:from-prim hover:to-prim'
                        }`}
                        onClick={()=>selectArtist(artist)}
                        >
                            <img src={artist.photo} alt={artist.name} className="w-64 h-64 object-cover" />
                            <h3 className="mt-2 text-lg text-center mx-2 group-hover:text-black">{artist.name}</h3>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col w-3/4 justify-center items-center py-3">
                    {message && <p className="text-white my-3">{message}</p>}
                    <CoolModeCustom onClick={sendArtist} content={"Get Award"}/>
                </div>
            </>
            ):(
                <h1 className="text-white mt-10">Loading...</h1>
            )}
        </div>
    )
}