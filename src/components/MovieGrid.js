import React, {useState, useEffect} from "react";
import '../styles.css';
import MovieCard from "./MovieCard";
export default function MovieGrid(){

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.log(error))
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    };
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (
        <div>
            <input
                className='search-input'
                type='text'
                placeholder='Search movies ...'
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className='movies-grid'>
                {
                    filteredMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id}></MovieCard>
                    ))
                }
            </div>
        </div>
    )
}