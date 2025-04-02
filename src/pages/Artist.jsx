import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../css/Artists.css"
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton.jsx";

const Artist = () => {
    const navigate = useNavigate()
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RlYzE0YmE2MDQzOGFjMmZjZDBiOSIsInVzZXJuYW1lIjoib3NseW54IiwiaWF0IjoxNzQzNTgyOTQ2LCJleHAiOjE3NDM1ODY1NDZ9.JVygQwWdsFZLSA-cFX-B-oGX7Y8I0p4P_M6IedvIW28"
    const { id } = useParams()
    const [ artist, setArtist ] = useState([])
    const [ releases, setReleases ] = useState([])
    const [ showCreateRelease, setShowCreateRelease ] = useState(false)
    const [ showEditArtist, setShowEditArtist ] = useState(false)
    const [ showEditRelease, setShowEditRelease ] = useState(false)
    const [ releaseTitle , setReleaseTitle ] = useState("")
    const [ releaseDate , setReleaseDate ] = useState(0)
    const [ editReleaseTitle , setEditReleaseTitle ] = useState("")
    const [ editReleaseDate , setEditReleaseDate ] = useState(0)
    const [ editArtistName , setEditArtistName ] = useState("")
    const [ editArtistAge , setEditArtistAge ] = useState("")

    // ARTIST

    const toggleEditArtist = () => {
        setShowEditArtist(!showEditArtist)
    }

    const fetchArtist = () => {
        fetch(`http://localhost:8000/artist/show/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setArtist(data)
                setReleases(data.releases)
            })
            .catch((error) => console.log(error))
    }

    const deleteArtist = async () => {
        try {
            await fetch(`http://localhost:8000/artist/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response)
                    navigate("/")
                })
        } catch (error) {
            console.log(error)
        }
    }

    const editArtist = (e,{id}) => {
        e.preventDefault()
        const releaseBody = {
            title: editArtistName,
            age: editArtistAge
        }
        fetch(`http://localhost:8000/artist/update/${id}`,{
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(releaseBody)
        })
            .then(res => {
                console.log(res)
                setEditArtistName("")
                setEditArtistAge("")
                toggleEditArtist()
                fetchArtist()
            })
            .catch(err => console.log(err))
    }

    //RELEASE

    const createRelease = (e) => {
        e.preventDefault()
        const releaseBody = {
            title: releaseTitle,
            releaseDate: releaseDate
        }
        fetch(`http://localhost:8000/release/add/${id}`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(releaseBody)
        })
            .then(res => {
                console.log(res)
                setReleaseTitle("")
                setReleaseDate(0)
                toggleCreateRelease()
                fetchArtist()
            })
            .catch(err => console.log(err))
    }

    const editRelease = (e,releaseId) => {
        e.preventDefault()
        const releaseBody = {
            title: editReleaseTitle,
            releaseDate: editReleaseDate
        }
        fetch(`http://localhost:8000/release/edit/${releaseId}`,{
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(releaseBody)
        })
            .then(res => {
                console.log(res)
                setEditReleaseTitle("")
                setEditReleaseDate(0)
                toggleEditRelease()
                fetchArtist()
            })
            .catch(err => console.log(err))
    }

    const toggleCreateRelease = () => {
        setShowCreateRelease(!showCreateRelease)
    }

    const toggleEditRelease = () => {
        setShowEditRelease(!showEditRelease)
    }

    const deleteRelease = (releaseId) => {
        console.log("delete")
        fetch(`http://localhost:8000/release/delete/${releaseId}`, {
            method : "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response)
                fetchArtist()
            })
            .catch((error) => console.log(error))
    }


    useEffect(() => {
            fetchArtist()
    }, [id]);

    return(
        <>
            <h2>Page Artist</h2>
            <div className="container-show">
                { showEditArtist ?
                <form className="edit-artist-form">
                    <h3>Editer l'artiste</h3>
                    <input
                        type="text"
                        placeholder="entrer le nouveau titre"
                        value={editArtistName}
                        onChange={(e) => setEditArtistName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="entrer la nouvelle date"
                        value={editArtistAge}
                        onChange={(e) => setEditArtistAge(e.target.value)}
                    />
                    <div className="artist-action">
                        <button onClick={editArtist}>Confirmer</button>
                        <button onClick={toggleEditArtist}>Annuler</button>
                    </div>
                </form>
                    :
                    <div>
                        <h3>{artist.name}</h3>
                        <span>{artist.age} ans</span>
                        <div className="artist-action">
                            <button onClick={toggleEditArtist}><i className="bi bi-pen"></i></button>
                            <button onClick={deleteArtist}><i className="bi bi-trash3"></i></button>
                        </div>
                    </div>
            }
                <div className="container-release">
                    <div className="release-header">
                        <h2>Les sorties</h2>
                        <button onClick={toggleCreateRelease} className="release-plus-button">{ showCreateRelease ? "Annuler" : "Créer" }<i className="ms-2 bi bi-plus"></i></button>
                        { showCreateRelease && (
                            <div>
                                <form className="create-release-form">
                                    <div>
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={releaseTitle}
                                            onChange={(e) => setReleaseTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Date</label>
                                        <input
                                            type="number"
                                            value={releaseDate}
                                            onChange={(e) => setReleaseDate(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={createRelease} className="release-submit-button">Envoyer</button>
                                </form>
                            </div>
                        )}

                    </div>
                { releases.map((release) => (
                    <div className="release-body" key={release._id}>
                        { showEditRelease ?
                            <form key={release._id} className="edit-release-form">
                                <h3>Editer la sortie</h3>
                                <input
                                    type="text"
                                    placeholder="nouveau titre"
                                    value={editReleaseTitle}
                                    onChange={(e) => setEditReleaseTitle(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="nouvelle date"
                                    value={editReleaseDate}
                                    onChange={(e) => setEditReleaseDate(e.target.value)}
                                />
                                <div className="artist-action">
                                    <button onClick={(e) => editRelease(e,release._id)}>Confirmer</button>
                                    <button onClick={toggleEditRelease} >Annuler</button>
                                </div>
                            </form>
                            :
                            <div>
                                <h3>{release.title}</h3>
                                <span>{release.releaseDate}</span>
                                <div className="artist-action">
                                    <button onClick={toggleEditRelease}><i className="bi bi-pen"></i></button>
                                    <button onClick={() => deleteRelease(release._id)} ><i className="bi bi-trash3"></i></button>
                                </div>
                            </div>
                        }
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default Artist;