import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars';

const MovieScreen = () => {

    const [movies, setMovies] = useState();
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [rating, setRating] = useState([]);
    const [index, setIndex] = useState(0);

    const [moviesList, setMoviesList] = useState([]);



    const handleRemove = (index) => {
     

        if (selectedMovies?.Response === index) {
            setSelectedMovies(null);
        } else {
            console.error('Movie does not match the index provided');
        }
    };




    const handleSearch = (e) => {
    
        const value = e.target.value
        setSearchName(value)

    }

    const filteredMovies = movies?.Search?.filter(movie =>
        movie?.Title.toLowerCase().includes(searchName.toLowerCase())
    );




    const fetchData = async () => {
        try {
            const response = await axios.post(`https://www.omdbapi.com/?apikey=57f834e5&s=${searchName}`);

            setMovies(response.data);
        } catch (err) {



        }
    };

    const handleMovieClick = async (imdb) => {
        try {
            const response = await axios.post(`https://www.omdbapi.com/?apikey=57f834e5&i=${imdb}`);

            setSelectedMovies(response.data);
            setRating('')
        } catch (err) {



        }
    }




    useEffect(() => {
        if (searchName) {
            fetchData();
        }


        // eslint-disable-next-line
    }, [searchName]);





    const ratingChanged = (newRating) => {

        setRating((prevMovies) => [...prevMovies, newRating])
    }

    const handleList = (index) => {

        setIndex(index)
        const newMovie = { ...selectedMovies, listIndex: index + 1 };

        setMoviesList((prevMovies) => [...prevMovies, newMovie]);
        setSelectedMovies([]);
    };
   
    const handleListRemove = (actors) => {
    

        setMoviesList((prevMoviesList) => prevMoviesList.filter((movie) => movie.Actors !== actors));

    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', width: '100vw', }}>
            <div style={{ padding: '30px 30px 0px 30px' }}>
                <div style={{
                    width: '96vw', height: '13vh', backgroundColor: '#6741d9', borderRadius: '10px', display: 'flex', justifyContent: 'space-between'
                }}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '40px' }}>
                        <img
                            src="https://www.inventicons.com/uploads/iconset/639/wm/512/popcorn-80.png"
                            alt="PopCorn"
                            style={{ width: '50px', height: '50px', paddingRight: '10px' }}
                        />
                        <div>
                            usePopcorn
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
                        <div style={{ position: 'relative', width: '300px', height: '40px' }}>
                            <input
                                type="text"
                                placeholder="Search.."
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    padding: '0 0px 0 10px',
                                    backgroundColor: '#f0f0f0',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    outline: 'none',
                                }}
                                value={searchName}
                                onChange={(e) => handleSearch(e)}
                            />
                            <span
                                onClick={() => {
                                    setSearchName("")
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: '#888',
                                }}
                            >
                                ✖
                            </span>
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '40px' }}>
                        Found {filteredMovies?.length === undefined ? '0' : filteredMovies?.length} Results
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', height: '70vh', paddingTop: '30px', }}>
                <div style={{
                    backgroundColor: '#2b2f33', width: '50vw', borderRadius: '20px', maxHeight: '500px',
                    overflowY: 'auto',
                }}>
                    <ul style={{ listStyleType: 'none', padding: '20px', margin: 0, color: '#fff' }}>
                        {movies?.Search === undefined ? <span style={{ fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}> {movies?.Error}</span> : filteredMovies?.map((movie, index) => (
                            <li
                                key={index}
                                style={{
                                    marginBottom: '10px',
                                    borderBottom: '1px solid white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingBottom: '10px',
                                }}
                                onClick={() => handleMovieClick(movie?.imdbID)}
                            >

                                <img src={movie?.Poster} alt={movie.Title} style={{ width: '50px', borderRadius: '5px' }} />

                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                    <span style={{ fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>
                                        {movie.Title}
                                    </span>
                                    <span style={{ color: '#ccc' }}>🗓 {movie?.Year}</span>
                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
                {selectedMovies?.Actors && <div style={{ backgroundColor: '#2b2f33', width: '50vw', borderRadius: '20px', marginLeft: '30px', padding: '20px', overflowY: 'scroll' }}>

                    <div>

                        <div>
                            <div style={{ display: 'flex', }}>
                                <img src={selectedMovies?.Poster} style={{ width: '100px', marginRight: '10px' }} alt='movie' />
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <span style={{ marginBottom: '10px' }}>{selectedMovies?.Title}</span>
                                        <button
                                            onClick={() => handleRemove(selectedMovies?.Response)}
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                height: '20px',
                                                width: '20px'
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                                        <span style={{ marginRight: '10px' }}>{selectedMovies?.Released}</span>
                                        <span>{selectedMovies?.Runtime}</span>
                                    </div>
                                    <span style={{ marginBottom: '10px' }}>
                                        {selectedMovies?.Genre}
                                    </span>
                                    <span>
                                        ⭐️ {selectedMovies?.imdbRating} IMDB Rating
                                    </span>
                                </div>

                            </div>
                            <div
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#2b2f33",
                                    borderRadius: "5px",
                                    border: "2px solid #ffd700",
                                    width: '30vw',
                                    marginLeft: '160px',
                                    marginTop: '40px',
                                    display: "flex",
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    flexDirection: "row",

                                }}
                            >
                                <ReactStars
                                    count={10}
                                    onChange={ratingChanged}
                                    size={34}
                                    value={rating}
                                    color2={"#ffd700"}
                                />
                                <p style={{ color: "#ffd700", textAlign: 'center', paddingLeft: '30px' }}>
                                    {rating ? `${rating}/10` : "Rate this movie"}
                                </p>

                            </div>

                            {rating ? <div style={
                                {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: "row",
                                    margin: '30px 0px 20px 0px',
                                    height: '30px',

                                }
                            }>
                                <button style={{
                                    padding: '20px', display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'blue',
                                    borderRadius: '20px',
                                    border: '2px solid black'
                                }}
                                    onClick={() => handleList(index)}>
                                    + Add to list
                                </button>
                            </div> : ''}


                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',

                                }}
                            >
                                <div>
                                    <p>{selectedMovies?.Plot}</p>
                                    <p>Starring {selectedMovies?.Actors}</p>
                                    <p>Directed By {selectedMovies?.Director ?? "No Data"}</p>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>}


                {(moviesList.length > 0 && selectedMovies?.length >= 0) && <div style={{
                    marginLeft: '30px'
                }} >
                    <div
                        style={{
                            backgroundColor: '#343a40',
                            padding: '10px',
                            borderRadius: '10px',
                            height: '100px',
                            width: '45vw'
                        }}
                    >

                        <div>
                            <p>Movies You Watched</p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                }}
                            >
                                <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
                                    <span>#️⃣</span>
                                    <p>{moviesList?.length} Movies</p>
                                </div>
                                <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
                                    <span>⭐️</span>
                                    <p> {moviesList[moviesList.length - 1]?.imdbRating}</p>
                                </div>
                                <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
                                    <span>🌟</span>
                                    <p>{rating}</p>
                                </div>
                                <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
                                    <span>⏳</span>
                                    <p>{moviesList[moviesList.length - 1]?.Runtime}</p>
                                </div>
                            </div>
                        </div>



                    </div>
                    <div
                        style={{
                            maxHeight: '320px',
                            overflowY: 'auto',
                            padding: '10px',
                            backgroundColor: '#2b2f33',
                            borderRadius: '5px',
                            marginTop: '20px'
                        }}
                    >

                        <ul style={{ listStyleType: 'none', padding: '20px', margin: 0, color: '#fff' }}>
                            {moviesList.length > 0 ?
                                moviesList?.map((movie, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            marginBottom: '10px',
                                            borderBottom: '1px solid white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            paddingBottom: '10px',
                                        }}
                                    >

                                        <img src={movie?.Poster} alt={movie.Title} style={{ width: '50px', borderRadius: '5px' }} />

                                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                                            <span style={{ fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>
                                                {movie.Title}
                                            </span>


                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    paddingLeft: '20px',
                                                    paddingRight: '20px',
                                                    gap: '80px',
                                                }}
                                            >
                                                <div style={{ alignItems: 'center', display: 'flex', }}>
                                                    <span>⭐️</span>
                                                    <p> {movie?.imdbRating}</p>
                                                </div>
                                                <div style={{ alignItems: 'center', display: 'flex', }}>
                                                    <span>🌟</span>
                                                    <p>{rating}</p>
                                                </div>
                                                <div style={{ alignItems: 'center', display: 'flex', }}>
                                                    <span>⏳</span>
                                                    <p>{movie?.Runtime}</p>
                                                </div>
                                                <div style={{ alignItems: 'center', display: 'flex', }}>
                                                    <button
                                                        onClick={() => handleListRemove(movie?.Actors)}
                                                        style={{
                                                            backgroundColor: 'red',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                            height: '20px',
                                                            width: '20px'
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                )) : ''}
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default MovieScreen