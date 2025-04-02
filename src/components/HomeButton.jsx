import "../css/HomeButton.css"
import {Link} from "react-router-dom";

const HomeButton = () => {


    return(
        <>
            <div className="home-button-container">
                <div className="home-button-div">
                    <div className="rect-icon">
                      <Link className="icon-home" to={"/"}><i className="bi bi-house"></i></Link>
                    </div>
                    <div className="rect-title">
                        <Link className="icon-home" to={"/about"}>API ARTIST</Link>

                    </div>
                    <div className="rect-icon">
                        <Link className="icon-home" to={"/login"}><i className="bi bi-box-arrow-in-right"></i></Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeButton;