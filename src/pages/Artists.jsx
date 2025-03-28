import {Link} from "react-router-dom";
import "../css/Artists.css"
import {useEffect, useState} from "react";

const Artists = () => {

    const [ artists, setArtists ] = useState([])
    const [ artistName, setArtistName ] =useState("")
    const [ artistAge, setArtistAge ] =useState("")
    const [ showCreateForm, setShowCreateForm ] = useState(false)

    function toggleCreateForm(){
        setShowCreateForm(!showCreateForm)
    }

    const newArtist = {
        name: artistName,
        age: artistAge
    }

    useEffect(() => {
        fetch("http://localhost:8000/artist/all")
            .then((response) => response.json())
            .then((data) => setArtists(data))
            .catch((error) => console.log(error))
    }, []);

    return(
        <>
            <div className="artists-header">
                <h2>Listes des artistes</h2>
                <div className="artists-header-underline"></div>
                <button className="release-plus-button" onClick={toggleCreateForm}>ajouter<i className="ms-2 bi bi-plus"></i></button>
            </div>
            { showCreateForm && (
                <div className="create-artist-container">
                    <form className="create-artist-form" action="">
                        <h2>Creer un nouvel artiste</h2>
                        <label >Name</label>
                        <input
                            type="text"
                            required
                        />
                        <label >Age</label>
                        <input
                            type="number"
                            required
                        />
                        <div className="artist-action">
                            <button onClick={toggleCreateForm}>Annuler</button>
                            <button>Creer</button>
                        </div>
                    </form>
                </div>
            )}

            <ul>
                {artists.map((artist) => (
                    <Link to={`/artist/${artist._id}`}  key={artist._id}>
                        <div className="li-artist">
                            <h3>{artist.name}</h3>
                            <span>Age : {artist.age}</span>
                        </div>
                    </Link>
                ))}
            </ul>

        </>
    )
}

export default Artists