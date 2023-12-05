import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [loginError, setError] = useState(null)
    const [loginLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        // Set a loading status until the request is complete
        setIsLoading(true)
        // In case of previous error, make sure to reset to null
        setError(null)

        // Create request to backend signup route with given information converted to JSON
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        // If resonse is not successful, set error
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
        // If reponse is successful
        if (response.ok) {
            // save user JSON token to local storage so that they don't get logged out
            localStorage.setItem('user', JSON.stringify(json))

            // Update authentication context for user
            dispatch({type: 'LOGIN', payload: json})
            
            // set loading to false now that request is finished
            setIsLoading(false)
        }
    }

    return { login, loginLoading, loginError }
}