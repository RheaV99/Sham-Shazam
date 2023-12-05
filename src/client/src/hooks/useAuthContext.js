import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    // If we try to use context outside of its scope, throw error
    if (!context) {
        throw Error('Must be used inside an AuthContextProvider')
    }

    return context
}