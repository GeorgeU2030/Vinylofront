import { rankingPeriod } from "@/services/artists";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const DetailRanking = () => {

    // navigation
    const { period } = useParams();

    const navigate = useNavigate()

    // states
    const [rankings, setRanking] = useState([])

    // effects
    useEffect(() => {
        if(!period){
            navigate('/home')
        }
        else {
            const fetchRanking = async ()=>{
                const response = await rankingPeriod(period)
                setRanking(response)
            }
        fetchRanking()
        }
    },[])


    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-dark to-black">
            <nav
            className="h-20 bg-pome flex items-center"
            >
            <div className="flex items-center lg:px-2 cursor-pointer"
            onClick={()=>navigate('/home')}
            >
                <img src="/vinylo.png" className="w-10 h-10 mx-2 lg:mx-3" />
                <h1 className="font-bold lg:text-xl text-prim">
                Vinylo
                </h1>
            </div>
            </nav>
            <div className="flex flex-col items-center my-4">
                <h1 className="text-prim text-2xl">{period}</h1>
                {rankings.length > 0 ? (
                    rankings.map((ranking, index) => (
                        <section key={index} className="group flex flex-col justify-center lg:flex-row items-center border-2 border-[#bebebe] rounded-lg mt-6 w-2/3 py-3 px-2">
                            <h1 className="text-prim text-xl w-16">{index+1}</h1>
                            <img src={ranking.artist.photo} className="rounded-full h-20 w-20 border-1 border-strong"/>
                            <h1 className="text-prim text-xl font-bold text-center w-96">{ranking.artist.name}</h1>
                            <h1 className="text-prim text-lg font-bold text-center w-48">{ranking.artist.country}</h1>
                            <h1 className="text-prim text-xl font-bold text-center w-32">{ranking.points}</h1>
                        </section>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-96">
                        <h1 className="text-prim text-xl">No data</h1>
                    </div>
                )}
            </div>
        </div>
    )
}