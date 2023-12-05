import { createContext, useReducer } from 'react'

export const SongsContext = createContext()

export const songsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SONGS': 
      return {
        songs: action.payload
      }
    default:
      return state
  }
}

export const SongsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(songsReducer, {
    songs: null
  })

  return (
    <SongsContext.Provider value={{...state, dispatch}}>
      { children }
    </SongsContext.Provider>
  )
}