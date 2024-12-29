import { Layout } from "@/layout/Layout"
import trophy from "../assets/trophy.png"
import { AuthContext } from "@/context/Authcontext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"

export const Awards = ()=> {

    // context
    const authContext = useContext(AuthContext)

    const { user } = authContext

    // navigation
    const navigate = useNavigate()

    // values and states
    let hasDate;

    if (user.dateInit != null){
        hasDate = true
    }else {
        hasDate = false
    }

    const [artists, setArtists] = useState([])

    return (
        <Layout menuActiveItem={'awards'}>
            {artists.lenght > 0 ?(
            <h1>Artists</h1>
            ):(
            hasDate ? (
            <NoArtistsMessage
                image={trophy}
                message={"You don't have any artist yet 😢"}
                buttonText={"Explore"}
                buttonAction={()=>navigate('/explore')}
            />
            ):(
            <NoArtistsMessage
                image={trophy}
                message={"Please asign a starting date for add your song and artists 😃"}
                buttonText={"Profile"}
                buttonAction={()=>navigate('/profile')}
                />
            )
            )} 
        </Layout>
    )
}