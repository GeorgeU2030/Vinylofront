import { Menubar } from "@/components/Menubar"
import { AuthContext } from "@/context/Authcontext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

export const Layout = ({children, menuActiveItem}) => {
    const authContext = useContext(AuthContext)

    const { user, isLoading } = authContext

    if(isLoading){
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        )
    }

    if(!user){
        return <Navigate to="/login" />
    }

    return (
        <div className={`min-h-screen w-full flex flex-col`}>
              <Menubar user={user} activeItem={menuActiveItem} />
              <div className="flex-grow overflow-x-hidden">
                <div className="container mx-auto px-4 py-8">
                  {children}
                </div>
              </div>
        </div>
    )

}