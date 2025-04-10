import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import "../css/LoginSignup.css"

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('')

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://back-artist.malakayalauvergnat.com/register', {
                username,
                password
            })
            setUsername('')
            setPassword('')
            console.log("inscription réussie")

            navigate('/login');

        } catch (error) {
            console.log(error);
            setError( "Une erreur s'est produite")
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="header">
                    <h1 className="title">Inscription</h1>
                    <div className="underline"></div>
                </div>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleRegister} className="card p-4 shadow-sm">
                    <div className="inputs">
                        <div className="input">
                            <i className="bi bi-person mx-3 fs-4"></i>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <Link to="/login" className="mx-1">
                            <button className="submit grey">
                                Se connecter
                            </button>
                        </Link>
                        <button type="submit" className="submit">
                            S'inscrire
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register