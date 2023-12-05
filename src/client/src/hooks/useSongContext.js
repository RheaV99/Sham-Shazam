import { SongsContext } from '../context/songContext'
import { useContext } from 'react'

export const useSongsContext = () => {
  const context = useContext(SongsContext)

  if (!context) {
    throw Error('useSongsContext must be used inside an SongsContextProvider')
  }

  return context
}