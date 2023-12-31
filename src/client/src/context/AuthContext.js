import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        // When logging out, just return null
        case 'LOGOUT':
            return { user: null }
        // If no matching case, return original state
        default:
            return state
    }
}

export const AuthContextProvider= ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    console.log(state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )

}