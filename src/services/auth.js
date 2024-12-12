import { instance } from "./axios"

export const signup = async (registerData) => {
    const response = await instance.post("/register", registerData)
    return response.data
}