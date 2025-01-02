import { instance } from "./axios";

export const updateArtists = async (infoArtist) => {
    const response = await instance.patch("/music/update_artist/", infoArtist , {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}

export const updateCurrentDate = async (infoDate) => {
    const response = await instance.put("/music/new_current_date/", infoDate , {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    })
    return response.data;
}

export const getArtistMonth = async (startDate) => {
    const response = await instance.post("/music/get_artist_month/", {start_date: startDate }, {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}