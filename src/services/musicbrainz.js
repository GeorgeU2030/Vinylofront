import axios from "axios";




// special cases
export const getArtistSpecialLisa = async ()=>{

    const url = 'https://musicbrainz.org/ws/2/artist?query=artist:LISA Blackpink&fmt=json'

    const response = await axios.get(url)
    console.log(response.data.artists[1])
    return response.data.artists[1]
}