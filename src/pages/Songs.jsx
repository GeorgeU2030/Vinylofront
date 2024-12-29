import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"
import { Layout } from "@/layout/Layout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import sound from "@/assets/sound.png"

export const Songs = () => {

    // states
    const [songs, setSongs] = useState([])

    // navigation
    const navigate = useNavigate()

    return (
        <Layout menuActiveItem={'songs'}>
            {songs.lenght > 0 ?(
            <h1>Songs</h1>
            ):(
            <NoArtistsMessage
                image={sound}
                message={"You don't have any song yet 😢"}
                buttonText={"Explore"}
                buttonAction={()=>navigate('/explore')}
            />
            )}
        </Layout>
    )
}