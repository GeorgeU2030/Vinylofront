import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import history from "../assets/history.png"
import { User, LogOut } from "lucide-react"
import { SelectCustom } from "./shared/SelectCustom"
import { AuthContext } from "@/context/Authcontext"

export const Menubar = ({user, activeItem}) => {

    // options for mobile devices
    const options = [
        {key: "home", label: "Home"},
        {key: "explore", label: "Explore"},
        {key: "ranking", label: "Ranking"},
        {key: "awards", label: "Awards"},
        {key: "history", label: "History"}
    ]

    // states
    const [menu, setMenu] = useState(false)

    // navigation
    const navigate = useNavigate()

    // context
    const authContext = useContext(AuthContext)
    const { logoutContext } = authContext

    // logout
    const logout = () => {
        logoutContext()
        localStorage.removeItem('token')
    }

    // toogle menu
    const toggleMenu = () => setMenu(!menu)

    // active class
    const getButtonClass = (item)=>{
        return item === activeItem ? "bg-strong" : "bg-prim hover:bg-strong"
    }

    return (
        <nav className="flex items-center justify-between min-h-20 bg-gradient-to-r from-pomepinkdark to-pomeorange">
            <div className="flex items-center lg:px-2 cursor-pointer"
            onClick={()=>navigate('/home')}
            >
                <img src="vinylo.png" className="w-10 h-10 mx-2 lg:mx-3" />
                <h1 className="font-bold text-base lg:text-2xl text-prim">
                    Vinylo
                </h1>
            </div>
            <div className="flex items-center lg:mr-12 mr-1 w-2/3 lg:w-2/5 justify-end ">
                <div className="hidden sm:flex gap-2">
                    <button className={`rounded-lg cursor-pointer font-bold px-6 py-2 ${getButtonClass('explore')}`}
                        onClick={()=>navigate('/explore')}
                        type="button"
                    >
                        Explore
                    </button>
                    <button className={`rounded-lg cursor-pointer font-bold px-6 py-2 ${getButtonClass('ranking')}`}
                        onClick={()=>navigate('/ranking')}
                    >
                        Ranking
                    </button>
                    <button className={`rounded-lg cursor-pointer font-bold px-6 py-2 ${getButtonClass('awards')}`}
                        onClick={()=>navigate('/awards')}
                    >
                        Awards
                    </button>
                    <button className="rounded-lg px-2 py-2 cursor-pointer">
                        <img src={history} className="w-8 h-8"/>
                    </button>
                </div>
                
                <div className="flex sm:hidden mr-4">
                    <SelectCustom options={options} navigate={navigate} activeItem={activeItem}/>
                </div>
                <div className="flex">
                    <button className="rounded-full border-2 border-lightviolet" onClick={toggleMenu}>
                        <img src={user?.avatar} className="w-10 h-10 rounded-full" />
                    </button>
                    {menu && (
                        <div className="absolute right-2 mt-10 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1 rounded-lg cursor-pointer" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="/profile" className="flex items-center px-4 py-2 text-sm text-center hover:bg-gray-100" role="menuitem">
                              <User className="text-violetneon mr-2"/>  Profile
                            </a>
                            <a className="flex items-center px-4 py-2 text-sm text-center hover:bg-gray-100" role="menuitem" onClick={logout}>
                              <LogOut className="text-violetneon mr-2"/> Logout
                            </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}