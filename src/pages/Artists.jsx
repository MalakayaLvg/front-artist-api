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

    const createArtist = async (e) => {
        e.preventDefault()
        console.log("create artist")
        const token = localStorage.getItem('token');
        try{
            await fetch("http://localhost:8000/artist/create",{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: artistName,
                    age: artistAge
                })
            })
                .then((response) => {
                if (response.ok) {
                    setArtistAge("")
                    setArtistName("")
                    loadArtist()
                }})

        } catch (error) {
            console.log(error)
            alert("erreur, veuillez réessayer")
        } finally {
            toggleCreateForm()
        }

    }

    const loadArtist = async () => {
        try {
            await fetch("http://localhost:8000/artist/all")
                .then((response) => response.json())
                .then((data) => setArtists(data))
                .catch((error) => console.log(error))
        } catch (error) {
            alert("error")
            console.log(error)
        }
    }



    useEffect(() => {
        loadArtist()
    }, []);

    return(
        <>
            <div className="artists-header">
                <h2>Listes des artistes</h2>
                <div className="artists-header-underline"></div>
                <button className="release-plus-button" onClick={toggleCreateForm}>ajouter<i className="ms-2 bi bi-plus"></i></button>
            </div>
            { showCreateForm && (
                    <form className="create-artist-form">
                        <h2>Creer un nouvel artiste</h2>
                        <label >Name</label>
                        <input
                            type="text"
                            required
                            value={artistName}
                            onChange={(e)=> setArtistName(e.target.value)}
                        />
                        <label >Age</label>
                        <input
                            type="number"
                            required
                            value={artistAge}
                            onChange={(e) => setArtistAge(e.target.value)}
                        />
                        <div className="artist-action">
                            <button onClick={toggleCreateForm}>Annuler</button>
                            <button onClick={createArtist}>Creer</button>
                        </div>
                    </form>
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

export default Artists;