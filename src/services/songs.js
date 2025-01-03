import { instance } from "./axios";

export const getLastWeek = async () => {
    const response = await instance.get("/music/last_week",{
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data.week;
}

export const addSong = async (song) => {
    const response = await instance.post("/music/api/songs/", song, {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;    
}

export const getAllSongs = async () => {
    const response = await instance.get("/music/get_allsongs/", {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    })
    
    return response.data;
}