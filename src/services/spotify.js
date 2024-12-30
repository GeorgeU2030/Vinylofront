import axios from "axios";

export const getSpotifyToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const url = `https://accounts.spotify.com/api/token`;
    const response = await axios.post(url, null, {
        params: {
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret
        }
    });
    return response.data.access_token;
} 

export const searchTracks = async (token,query) => {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: query,
          type: "track"
        }
    });
    return data.tracks.items;
}

export const getTrack = async (token, id) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return data;
}

export const getArtist = async (token, id) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return data;
}