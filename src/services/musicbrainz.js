import axios from "axios";


// control service and special artist

export const getCountryController = async (artist)=>{
    if (artist === 'LISA'){
        return getArtistSpecialLisa()
    } else if (artist === 'Oaks'){
        return getArtistSpecialOaks()
    }else {
        
        return getArtistCountry(artist)
    }
}

export const getArtistCountry = async (artist)=>{
    const url = `https://musicbrainz.org/ws/2/artist?query=artist:${artist}&fmt=json`
    const response = await axios.get(url)
    const city = response.data.artists[0]['begin-area'].name
    if (city == 'United States'){
        return 'United States'
    }
    const encodedCity = encodeURIComponent(city)
    const geonamesurl = `http://api.geonames.org/searchJSON?q=${encodedCity}&maxRows=1&username=georgeu2030`
    const geonamesresponse = await axios.get(geonamesurl)
    const data = geonamesresponse.data.geonames[0].countryName
    if (data){
        return data
    }
}
    


// special cases
// LISA CASE
export const getArtistSpecialLisa = async ()=>{
    return "Thailand"
}

// Oaks CASE
export const getArtistSpecialOaks = async ()=>{
    return "Sweden"
}