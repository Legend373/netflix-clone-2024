import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { Link, useParams } from 'react-router-dom';
const Player = () => {
    const { id } = useParams();

    const [apiData, setapiData] = useState({
        name: "",
        key: "",
        published_at: "",
        typeof: ""
    });
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWRlODZlYTNkYTQxMWNlNDI1NmUxN2ZjNDBiNzZjZiIsIm5iZiI6MTcyNzk1MjAyNi43MTI5MDUsInN1YiI6IjY2ZmU3MWY5NmZjNzRlNTc1NmY3Y2JjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.me1EEIQ6JaGgK_coj6ZYq9CBUUqssnYCCH_Wop47FXI'
        }
    };
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setapiData(response.results[0]))
            .catch(err => console.error(err));
    }, [])


    return (

        <div className='player'>
            <Link to={`/`}><img src={back_arrow_icon} alt="arrow-icon" /></Link>
            <iframe width='80%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
            <div className='player-info'>
                <p>{apiData.published_at.slice(0, 10)} </p>
                <p> {apiData.name} </p>
                <p>{apiData.typeof} </p>
            </div>
        </div>
    )
}

export default Player
