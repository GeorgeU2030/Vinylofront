import { instance } from "./axios";

export const getLastWeek = async () => {
    const response = await instance.get("/music/last_week",{
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
        }
    });
    return response.data.week;
}