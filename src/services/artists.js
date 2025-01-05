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

export const addMonthAward = async (infoAward) => {
    const response = await instance.post("/music/add_month_award/", infoAward , {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    })
    return response.data;
}

export const rankingArtists = async () => {
    const response = await instance.get("/music/ranking/", {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}

export const rankingAwards = async () => {
    const response = await instance.get("/music/ranking_awards/", {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}

export const awardsHistory = async () => {
    const response = await instance.get("/music/get_awards_history/", {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}

export const rankingPeriod = async (period_rank) => {
    const decoded = decodeURIComponent(period_rank)
    const response = await instance.get(`/music/ranking_period/${decoded}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    })
    return response.data;
}

export const getStats = async () => {
    const response = await instance.get("/music/stats/", {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}

export const getArtist = async (id) => {
    const response = await instance.get(`/music/get_artist/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}

export const awardsArtist = async (id) => {
    const response = await instance.get(`/music/award_artist/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data;
}