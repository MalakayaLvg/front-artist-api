import "../css/LoginSignup.css"
import {useState} from "react";

const LoginSignup = () => {

    const [ action, setAction ] = useState("Sign Up")

    return(
        <>
            <div className="main-container">
                <div className="header">
                    <h1 className="title">{action}</h1>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <i className="bi bi-person mx-3 fs-4"></i>
                        <input type="text" placeholder="Username"/>
                    </div>
                    <div className="input">
                        <i className="bi bi-key mx-3 fs-4"></i>
                        <input type="password" placeholder="Password"/>
                    </div>
                </div>
                <div className="submit-container">
                    <div className={action === "Login"?"submit grey":"submit"} onClick={()=>setAction("Sign Up")}>Sign up</div>
                    <div className={action === "Sign Up"?"submit grey":"submit"} onClick={() => setAction("Login")}>Login</div>
                </div>
            </div>
        </>
    )
}

export default LoginSignup;