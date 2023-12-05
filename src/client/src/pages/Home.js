import '../style.css';
import { useState } from "react"
import { useSignup } from '../hooks/useSignup';
import { useLogin } from '../hooks/useLogin';

const Home = () => {
    const [userName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, signupError, singupLoading} = useSignup()
    const {login, loginError, loginLoading} = useLogin()

    const handleSignup = async (e) => {
        e.preventDefault()

        await signup(userName, email, password)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="home">
            <div className="title">
                <h1>Sham Shazam</h1>
                <p>Here to help you to pay your music royalties to your favourite artist. Please signup or login to continue</p>
            </div>
            <div className="main">  	
                <input type="checkbox" id="cb" aria-hidden="true"/>
                
                <div className="signup">
                    <form onSubmit={handleSignup}>
                        <label for="cb" aria-hidden="true">Sign up</label>
                        <input 
                            type="text" 
                            placeholder="User name"
                            onChange={(e) => setName(e.target.value)} 
                            value={userName} 
                        />
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                        />
                        <button disabled={singupLoading}>Sign up</button>
                        {signupError && <div className='signupError'>{signupError}</div>}
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={handleLogin}>
                        <label for="cb" aria-hidden="true">Login</label>
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                        />
                        <button disabled={loginLoading}>Login</button>
                        {loginError && <div className='loginError'>{loginError}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home