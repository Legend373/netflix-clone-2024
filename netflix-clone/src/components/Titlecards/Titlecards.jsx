import React, { useEffect, useRef, useState } from 'react'
import "./Titlecards.css"
import Cards_data from "../../assets/cards/Cards_data.js";
import { Link } from 'react-router-dom';



const Titlecards = ({ title, category }) => {
    const [apiData, setapiData] = useState([]);
    const cardsRef = useRef();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWRlODZlYTNkYTQxMWNlNDI1NmUxN2ZjNDBiNzZjZiIsIm5iZiI6MTcyNzk1MjAyNi43MTI5MDUsInN1YiI6IjY2ZmU3MWY5NmZjNzRlNTc1NmY3Y2JjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.me1EEIQ6JaGgK_coj6ZYq9CBUUqssnYCCH_Wop47FXI'
        }
    };


    const handleWheel = (event) => {
        event.preventDefault;
        cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setapiData(response.results))
            .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])
    return (
        <div className='title-cards'>
            <h2>{title ? title : 'Popular on Netflix'}</h2>
            <div className='cards-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`http://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title} </p>

                    </Link>
                })}
            </div>
        </div>
    )
}

export default Titlecards
