import { Layout } from "@/layout/Layout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import grammy from "@/assets/grammy.png"
import { NoArtistsMessage } from "@/components/shared/NoArtistsMessage"

export const History = () => {

    // states
    const [awards, setAwards] = useState([])

    // navigation
    const navigate = useNavigate()

    return (
        <Layout menuActiveItem={'history'}>
            {awards.lenght > 0 ?(
                <h1>Awards</h1>
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