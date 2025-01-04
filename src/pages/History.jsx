import { Layout } from "@/layout/Layout"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import grammy from "@/assets/grammy.png"
import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"
import { awardsHistory } from "@/services/artists"
import vinyloambar from "@/assets/vinylos/vinyloamber.png"
import vinylosilver from "@/assets/vinylos/vinylosilver.png"
import vinylogold from "@/assets/vinylos/vinylogold.png"
import { Music } from "lucide-react"

export const History = () => {

    // states
    const [awards, setAwards] = useState([])

    // navigation
    const navigate = useNavigate()

    // effects

    useEffect(() => {
        const fetchAwards = async ()=>{
            const response = await awardsHistory()
            setAwards(response)
        }
        fetchAwards()
    },[])

    const getTypeAward = (type) => {
        if (type === 2){
            return vinylosilver
        }
        else if (type === 3 || type === 4){
            return vinyloambar
        }
        else if (type === 5){
            return vinylogold
        }
    }

    const getButton = (type, period) => {
        
        if (type == 3 || type === 4 || type === 5){
            return <button className="bg-strong text-white font-bold rounded-lg p-2 group-hover:bg-violetneon"
            onClick={()=> navigate(`/rank/${period}`)}
            >
                <Music size={24} />
            </button>
        }
        
    }

    return (
        <Layout menuActiveItem={'history'}>
            {awards.length > 0 ?(
                <div className="flex flex-col items-center w-full">
                    <div className="flex justify-between items-center w-2/3">
                        <h1 className="text-prim text-2xl flex-grow text-center">History Awards</h1>
                        <button className="bg-violetneon text-white font-bold px-4 py-2 rounded hover:bg-strong border-2 border-prim"
                        onClick={()=> navigate('/stats')}
                        >STATS</button>
                    </div>
                    
                        {awards.map((award, index) => (
                            <section key={index} className="group flex flex-col lg:flex-row items-center border-2 border-[#bebebe] rounded-lg mt-6 w-11/12 lg:w-2/3 py-3 px-2">
                                <img src={getTypeAward(award.award.type_award)} className="w-20 h-20 rounded-lg p-1"/>
                                <h1 className="text-prim text-xl font-bold text-center w-96 py-3 lg:py-0">{award.award.description}</h1>
                                <img src={award.artist_photo} className="rounded-full h-20 w-20 border-1 border-strong"/>
                                <h1 className="text-white text-lg font-bold text-center w-96">{award.artist_name}</h1>
                                {getButton(award.award.type_award, award.award.description)}
                            </section>
                        ))}
                </div>
                ):(
                <NoArtistsMessage
                    image={grammy}
                    message={"You don't have any award yet, you need add songs 😢"}
                    buttonText={"Explore"}
                    buttonAction={()=>navigate('/explore')}
                />
            )}
        </Layout>
    )
}