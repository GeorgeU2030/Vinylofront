import axios from "axios";

export const restCountry = async (country) => {
    
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
    const response = await axios.get(url)
    
    const data = response.data
    const countryInfo = data[0]; 
    return countryInfo.flags.svg      
}