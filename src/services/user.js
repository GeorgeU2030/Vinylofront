import { instance } from "./axios";

export const updateUser = async (id,updateData) => {
    const response = await instance.put(`/user`, updateData, {
        params: {
            id
        }
    })
    console.log(response.data)
    return response.data
}