import logo from './logo.svg';
import './App.css';
import './styles.css';
import Header from './components/Header'
import Footer from "./components/Footer";
import MovieGrid from "./components/MovieGrid";
import Watchlist from "./components/Watchlist";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useEffect, useState} from "react";

function App() {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        fetch("movies.json")
            .then((response) => response.json())
            .then((data) => setMovies(data));
    }, []);

    const toggleWatchlist = (movieId) => {
        setWatchlist((prev) =>
            prev.includes(movieId)
                ? prev.filter((id) => id !== movieId)
                : [...prev, movieId]
        );
    };
    console.log(watchlist)
    return (
        <div className="App">
            <div className="container">
                <Header></Header>

                <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/watchlist">Watchlist</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MovieGrid
                                    watchlist={watchlist}
                                    movies={movies}
                                    toggleWatchlist={toggleWatchlist}
                                />
                            }
                        ></Route>
                        <Route
                            path="/watchlist"
                            element={
                                <Watchlist
                                    watchlist={watchlist}
                                    movies={movies}
                                    toggleWatchlist={toggleWatchlist}
                                />
                            }
                        ></Route>
                    </Routes>
                </Router>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default App;