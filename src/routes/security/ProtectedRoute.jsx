import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token')
            if (token) {
                setIsAuthenticated(true)
            }else {
                setIsAuthenticated(false)
            }
            setIsLoading(false)
        }
        checkToken()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}
