import axios from "axios";


// control service and special artist

export const getCountryController = async (artist)=>{
    
    if (artist === 'LISA'){
        return getArtistSpecialLisa()
    } else if (artist === 'Oaks'){
        return getArtistSpecialOaks()
    }
    else if (artist == 'KAROL G'){
        return getArtistSpecialKarolG()
    }
    else if (artist == 'League of Legends' || artist=="Assassin's Creed"){
        return getArtistSpecialLOL()
    }
    else if (artist == 'K/DA'){
        return getArtistSpecialLOL()
    }
    else if(artist == 'AREA21' || artist == 'Mesto' || artist == 'WILHELM'){
        return getArtistSpecialAREA21()
    }
    else if(artist == 'Europa'){
        return 'Germany'
    }
    else if(artist == 'Regard'){
        return 'United States'
    }
    else if(artist == 'Manuel Turizo'){
        return 'Colombia'
    }
    else if(artist == 'Lloyiso'){
        return 'South Africa'
    }
    else if(artist == 'Mishaal Tamer'){
        return 'Saudi Arabia'
    }
    else if(artist == 'KIDDO'){
        return 'Sweden'
    }else if(artist == 'Eminem'){
        return 'United States'
    }
    else {  
        return getArtistCountry(artist)
    }
}

export const getArtistCountry = async (artist)=>{
    
    const url = `https://musicbrainz.org/ws/2/artist?query=artist:${artist}&fmt=json`
    const response = await axios.get(url)
    const city = response.data.artists[0]['begin-area'].name
    if (city == 'United States' || city == 'San Francisco' || city == 'Canton' || city == 'Georgia' || city == 'Wyckoff' || city == 'Naples'){
        return 'United States'
    }
    if(city == 'Scarborough'){
        return 'Canada'
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

// KAROL G CASE
export const getArtistSpecialKarolG = async ()=>{
    return "Colombia"
}

// Oaks CASE
export const getArtistSpecialOaks = async ()=>{
    return "Sweden"
}

// LOL CASE or K/DA
export const getArtistSpecialLOL = async()=>{
    return "United States"
}

export const getArtistSpecialAREA21 = async()=>{
    return "The Netherlands"
}

