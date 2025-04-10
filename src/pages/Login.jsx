import {useContext, useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext.jsx";
import "../css/LoginSignup.css";

function Template() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://back-artist.malakayalauvergnat.com/login', {
                username,
                password
            },)
            login(username, response.data.token)
            console.log('réussi')
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="main-container">
            <div className="header">
                <h1 className="title">Connexion</h1>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleLogin} className="card p-4 shadow-sm">
                <div className="inputs">
                    <div className="input">
                        <i className="bi bi-person mx-3 fs-4"></i>
                        <input
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Nom d'utilisateur"
                            required
                        />
                    </div>
                    <div className="input">
                        <i className="bi bi-key mx-3 fs-4"></i>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            placeholder="Mot de passe"
                            required
                        />
                    </div>
                </div>
                <div className="submit-container">
                    <Link to="/register" className="mx-1">
                        <button className="submit grey">
                            S'inscrire
                        </button>
                    </Link>
                    <button type="submit" className="submit">
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Template