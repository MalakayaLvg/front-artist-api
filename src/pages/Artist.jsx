import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../css/Artists.css"

const Artist = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RlYzE0YmE2MDQzOGFjMmZjZDBiOSIsInVzZXJuYW1lIjoib3NseW54IiwiaWF0IjoxNzQzMTcwNjM2LCJleHAiOjE3NDMxNzQyMzZ9.WrEjxyC6L6h9mkr7HcOUGzTMqgWrCSCwJz8euN-mESc"
    const { id } = useParams()
    const [ artist, setArtist ] = useState([])
    const [ releases, setReleases ] = useState([])

    function deleteRelease(releaseId){
        fetch(`http://localhost:8000/release/delete/${releaseId}`, {
            method : "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
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
    }, [id]);

    return(
        <>
            <h2>Page Artist</h2>
            <div className="container-show">
                <h3>{artist.name}</h3>
                <span>{artist.age} ans</span>
                <div className="artist-action">
                    <button><i className="bi bi-pen"></i></button>
                    <button><i className="bi bi-trash3"></i></button>
                </div>
                <div className="container-release">
                    <div className="release-header">
                        <h2>Les sorties</h2>
                        <button className="release-plus-button">ajouter<i className="ms-2 bi bi-plus"></i></button>
                    </div>
                { releases.map((release) => (
                    <div className="release-body">
                        <h3>{release.title}</h3>
                        <span>{release.releaseDate}</span>
                        <div className="artist-action">
                            <button ><i className="bi bi-pen"></i></button>
                            <button onClick={() => deleteRelease(release.id)} ><i className="bi bi-trash3"></i></button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default Artist;