import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

import '../style.css';
import '../play.css';

const Navbar = () => {
    
  const { user } = useAuthContext()
  const { logout } = useLogout()

  return (
    <header>
      <div className="container">
        <nav>
            {user && (
                <div>
                
                <button className='logoutbtn'onClick={logout}>Logout</button>
                <Link to="/history">
                  <button className='SHistory'>Song History</button>
                </Link>
                <Link to="/">
                  <button className='Play'>Listen</button>
                </Link>
                
                </div>
            )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar