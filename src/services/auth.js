import { instance } from "./axios"

export const signup = async (registerData) => {
    const response = await instance.post("/register", registerData)
    return response.data
}

export const login = async (loginData) => { 
    const response = await instance.post("/login", loginData)
    setToken(response.data.token)
    return response.data
}

function setToken(token){
    localStorage.setItem('token', token)
}