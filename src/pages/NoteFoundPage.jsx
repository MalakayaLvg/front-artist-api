import {Link} from "react-router-dom";
import "../App.css"

const NoteFoundPage = () => {
    return(
        <>
            <h1>Not found page</h1>
            <Link to={"/"}>
                <button className="">Go home</button>
            </Link>
        </>
    )
}

export default NoteFoundPage;