import '../style.css'
import { useEffect }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useSongsContext } from '../hooks/useSongContext';
import format from 'date-fns/format'
import Navbar from '../components/nav'

const History = () => {
    const {songs, dispatch} = useSongsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchSongs = async () => {
          const response = await fetch('/api/song', {
            headers: {'authorisation': `Bearer ${user.token}`},
          })
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_SONGS', payload: json})
          }
        }
    
        if (user) {
          fetchSongs()
        }
      }, [dispatch, user])

      const openLink = (song) => {
        window.open(song.song_link, '_blank', 'noreferrer');
      };
    
      return (
        <div className="history">
          <Navbar />
        <div className="table">
          <section className="table_body">
          <table>
            <thead>
              <tr>
                <th> Title </th>
                <th> Artist </th>
                <th> Date </th>
                <th> Location </th>
              </tr>
            </thead>
            <tbody>
            {songs && songs.map((song) => (
              <tr onClick={() => openLink(song)}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{format(new Date(song.createdAt), 'dd MMM yyyy HH:mm')}</td>
                <td>{song.location}</td>
              </tr>
            ))}
            </tbody>
          </table>
          </section>
        </div>
        </div>
      )
}

export default History;