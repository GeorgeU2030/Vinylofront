import { getStats } from "@/services/artists"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export const Stats = () => {

    // states
    const [ranks, setRanks] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [maxWeek, setMaxWeek] = useState(0)

    const navigate = useNavigate()

    // Generate column headers dynamically based on maxWeek, starting from week 1
    const columns = [
        { key: 'position', label: '#' },
        { key: 'photo', label: '' },
        { key: 'name', label: 'Artist' },
        ...Array.from({ length: Math.min(maxWeek, 8) }, (_, i) => ({ 
            key: `week_${maxWeek - i}`, 
            label: `Week ${maxWeek - i}` 
        })).filter(column => {
            const weekNumber = parseInt(column.key.split('_')[1])
            return weekNumber > 0
        })
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStats()
                setRanks(response.artistData)
                setMaxWeek(response.maxWeek)
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoaded(true)
            }
        }
        fetchStats()
    }, [])

    const renderCell = (item, key) => {
        if (key === 'position') {
            return (
                <div className="flex justify-center">
                    <span className="font-semibold text-prim text-xl">
                        {item.current_position}
                    </span>
                </div>
            )
        }

        if (key === 'photo') {
            return (
                <div className="flex justify-center min-w-20">
                    <img 
                        src={item.photo} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-full"
                    />
                </div>
            )
        }
        if (key === 'name') {
            return (
                <div className="flex justify-center w-full min-w-72 ">
                    <span className="font-semibold text-center text-white">
                        {item.name}
                    </span>
                </div>
            )
        }
        if (key.startsWith('week_')) {
            const week = key.slice(5)
            return (
                <div className="flex justify-center">
                    <span className="font-semibold text-prim text-xl">
                        {item.ranks[week] || '-'}
                    </span>
                </div>
            )
        }
        return null
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-dark to-black">
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
            
            <div className="flex-grow flex flex-col items-center w-full">
                {loaded && (ranks.length > 0 ? (
                    <section className="w-full md:w-4/5 mt-3">
                        <div className="overflow-auto max-w-[80rem] max-h-[40rem]">
                            <table className="w-full border-collapse">
                                <thead className="border-2 border-green-400 rounded-lg">
                                    <tr>
                                        {columns.map(column => (
                                            <th 
                                                key={column.key}
                                                className="text-center bg-gradient-to-r from-strong to-violetneon text-white p-3 border border-teal-700"
                                            >
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {ranks.map(item => (
                                        <tr key={item.id}>
                                            {columns.map(column => (
                                                <td 
                                                    key={column.key}
                                                    className="border border-teal-200 p-2"
                                                >
                                                    {renderCell(item, column.key)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ) : (
                    <section className="flex-grow flex flex-col items-center justify-center">
                        <h1 className="text-teal-950 text-2xl text-center">
                            You do not have Ranks yet...
                        </h1>
                    </section>
                ))}
            </div>
        </div>
    )
}