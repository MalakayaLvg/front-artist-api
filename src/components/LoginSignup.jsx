import "../css/LoginSignup.css"
import { useState } from "react";
import axios from 'axios';


const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");







    return(
        <>
            <div className="main-container">
                <div className="header">
                    <h1 className="title">{action}</h1>
                    <div className="underline"></div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="inputs">
                    <div className="input">
                        <i className="bi bi-person mx-3 fs-4"></i>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <i className="bi bi-key mx-3 fs-4"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="submit-container">
                    <div
                        className={action === "Login" ? "submit grey" : "submit"}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit grey" : "submit"}
                        onClick={() => setAction("Login")}
                    >
                        Login
                    </div>
                </div>
                <div className="submit-action">
                    {action === "Login" ? (
                        <button className="action-button">Se connecter</button>
                    ) : (
                        <button className="action-button">S'inscrire</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default LoginSignup;