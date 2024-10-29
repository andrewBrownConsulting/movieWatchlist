"use client"

import { act, useEffect, useRef, useState } from "react";
import { refreshMovies } from "./movieList";
import { previewMovie } from "./displayMovies";
import { time } from "console";

function addMovie(m: Movie) {
    //add movie to database using a query post request
    //if m.name contains a space, replace it with a '+'
    m.name = m.name.replace(' ', '+');
    //if m.name contains a & replace it with a '%26'
    m.name = m.name.replace('&', '%26');
    //if m.name contains a ? replace it with a '%3F'
    const request = "http://localhost:3002/add-movie?id=" + m.id + "&name=" + m.name + "&image=" + m.image + "&description=" + m.description + "&year=" + m.year;
    fetch(request, {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//find the poster image for a movie
async function getMovieData(name: string) {
    console.log("api call for " + name);
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + name);
    return response.json();
}

function makePreviewTiles(movies, clickAddMovie, setPreviewTile) {
    //wait for the movies to be loaded
    console.log("making preview tiles");
    console.log(movies);
    return (
        <div className="grid  gap-4 p-[10px] rounded-xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
            {movies.map((movie) => {
                if (movie.poster_path === null) {
                    return null;
                }
                return previewMovie({
                    id: movie.id,
                    name: movie.title,
                    image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movie.poster_path,
                    description: movie.overview,
                    year: movie.release_date.split('-')[0],
                }, clickAddMovie, setPreviewTile);
            }
            )}
        </div>
    );
}

async function getMoviesFromReq(request: string, setRandomMovies, randomMovies) {
    let newRandomMovies: any[] = [];

}

function getRandomMovies(setTempMovies, tempMovies, options = {}) {
    console.log(options);
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const allMovies = [];
    setTempMovies([]);
    let request = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key;
    if (options.actors) {
        request += "&with_cast=" + options.actors.id;
    }
    if (options.director) {
        request += "&with_crew=" + options.director.id;
    }
    if (options.genre && options.genre !== "none") {
        request += "&with_genres=" + options.genre;
    }
    for (let i = 1; i < 9; i++) {
        const newReq = request + "&page=" + i;

        fetch(newReq).then((req) => {
            //check if the request was successful
            if (!req.ok) {
                return;
            }
            req.json().then((data) => {
                const movies = data.results;
                if (movies.length === 0) {
                    return;
                }
                let numMovies = movies.length;
                for (let i = 0; i < numMovies; i++) {
                    const movie = movies[i];
                    allMovies.push(movie);
                }
                //append new movies to the list of random movies
                console.log("newRandomMovies");
                console.log(allMovies);
                setTempMovies(allMovies);
            });
        });
    }
}


function getPossibleDirector(value, setDirectors) {
    const valuecopy = value + "";
    //wait one second and check if target has changed
    setTimeout(() => {
        if (valuecopy !== value) {
            return;
        }
        if (value.length < 3) {
            setDirectors(null);
            return;
        }
        const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
        let request = "https://api.themoviedb.org/3/search/person?api_key=" + api_key + "&query=" + value + "&include_adult=false";
        //only show directors
        request += "&with_job=Director";
        fetch(request).then((req) => {
            req.json().then((data) => {
                //sort the list by popularity
                data.results.sort((a, b) => {
                    return b.popularity - a.popularity;
                });
                setDirectors(data);
            });
        });
    }, 500);
}

function getPossibleActor(value, setActors) {
    const valuecopy = value + "";
    //wait one second and check if target has changed
    setTimeout(() => {
        if (valuecopy !== value) {
            return;
        }
        if (value.length < 3) {
            setActors(null);
            return;
        }
        const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
        let request = "https://api.themoviedb.org/3/search/person?api_key=" + api_key + "&query=" + value + "&include_adult=false";
        fetch(request).then((req) => {
            req.json().then((data) => {
                //sort the list by popularity
                data.results.sort((a, b) => {
                    return b.popularity - a.popularity;
                });
                setActors(data.results);
            });
        });
    }, 500);
}

function ChooseDirector(chosenDirector, directors, setDirectors, setChosenDirector) {
    return (
        <div className="grid grid-cols-1">
            <input type="text" name="director" autoComplete="off" placeholder="Director" required className="bg-gray-800 text-white text-center w-[100%]  m-auto rounded-lg text-xl"
                onChange={(e) => { e.target.scrollIntoView(); getPossibleDirector(e.target.value, setDirectors); }} />
            {//create a dropdown list of directors
                <div className="grid grid-cols-1 gap-2 relative">
                    {directors && directors.results.map((director) => {
                        return <div key={director.id} className="text-white text-xl rounded-lg bg-gray-800 text-center hover:bg-blue-500 hover:cursor-pointer" onClick={() => { setChosenDirector({ "id": director.id, "name": director.name }); setDirectors(null) }
                        }> {director.name}</div>
                    })
                    }
                </div>
            }
            <div className="flex text-white text-xl rounded-lg bg-gray-800 gap-2 justify-center">
                <h1 className="text-center">{chosenDirector != null ? chosenDirector.name : "Not found"}</h1>
                <button onClick={(e) => { e.preventDefault(); setChosenDirector(null) }}>{" x"}</button>
            </div>

        </div >
    );
}
function ChooseGenre(chosenGenre, setChosenGenre) {
    const genres = {
        "Select Genre": null,
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Horror": 27,
        "Music": 10402,
        "Mystery": 9648,
        "Romance": 10749,
        "Science Fiction": 878,
        "TV Movie": 10770,
        "Thriller": 53,
        "War": 10752,
        "Western": 37
    }

    return (<select className="text-white text-xl rounded-lg bg-gray-800 text-center" name="genre" value={chosenGenre} onChange={(e) => setChosenGenre(e.target.value)}>
        {Object.keys(genres).map((genre) => {
            return <option key={genre} value={genres[genre]}>{genre}</option>
        })}
    </select>)
}

function ChooseActors(chosenActors, setChosenActors, actors, setActors) {
    return (
        <div className="grid grid-cols-1">
            <input type="text" name="actor" autoComplete="off" placeholder="Actor" required className="bg-gray-800 text-white text-center w-[100%]  m-auto rounded-lg text-xl"
                onChange={(e) => { e.target.scrollIntoView(); getPossibleActor(e.target.value, setActors); }} />
            {//create a dropdown list of actors
                <div className="grid grid-cols-1 gap-2 relative">
                    {actors && actors.map((actor) => {
                        return <div key={actor.id} className="text-white text-xl rounded-lg bg-gray-800 text-center hover:bg-blue-500 hover:cursor-pointer" onClick={() => { setChosenActors({ "id": actor.id, "name": actor.name }); setActors(null) }
                        }> {actor.name}</div>
                    })
                    }
                </div>
            }
            <div className="flex text-white text-xl rounded-lg bg-gray-800 gap-2 justify-center">
                <h1 className="text-center">{chosenActors != null ? chosenActors.name : "Not found"}</h1>
                <button onClick={(e) => { e.preventDefault(); setChosenActors(null) }}>{" x"}</button>
            </div>

        </div >
    );
}

function makePreviewMovies(name: string, setRandomMovies: any) {

    const namecopy = name + ""; //deep copy

    //wait one second and check if target has changed
    setTimeout(() => {
        if (namecopy !== name) {
            return;
        }
        if (name.length < 3) {
            setRandomMovies(null);
            return;
        }
        getMovieData(name).then((data) => {
            if (data.results.length === 0) {
                setRandomMovies(null);
                return;
            }
            setRandomMovies(data.results);
        }
        );
    }, 500);
}

export default function AddMovie({ setMovieList }) {
    //make a default movie
    const [previewTiles, setPreviewTile] = useState(null);
    const [chosenGenre, setChosenGenre] = useState<string>();
    const [directors, setDirectors] = useState();
    const [chosenDirector, setChosenDirector] = useState<string>();
    const [searchType, setSearchType] = useState<string>("title");
    const [tempMovies, setTempMovies] = useState<Movie[]>();
    const [filledMovies, setFilledMovies] = useState<Movie[]>();

    const [actors, setActor] = useState();
    const [chosenActors, setChosenActors] = useState<Movie[]>();

    const myRef = useRef(null);
    function clickAddMovie(m: Movie, setPreviewTile: any) {
        addMovie(m);
        setTimeout(() => refreshMovies(setMovieList), 100);
    }

    useEffect(() => {
        if (tempMovies === null)
            setPreviewTile(null);
        if (tempMovies) {
            const twentyRandomMovies = [];

            for (let i = 0; i < Math.min(tempMovies.length, 20); i++) {
                const randIndex = Math.floor(Math.random() * tempMovies.length);
                if (twentyRandomMovies.includes(tempMovies[randIndex])) {
                    i--;
                    continue;
                }
                twentyRandomMovies.push(tempMovies[randIndex]);
            }
            setPreviewTile(makePreviewTiles(twentyRandomMovies, clickAddMovie, setPreviewTile));
        }
    }, [tempMovies]);



    return (
        <div className="w-[vw] bg-slate-600 top-5 rounded-lg">
            <div className="grid grid-cols-2 gap-2 p-2 max-w-[1000px] m-auto">
                <button onClick={() => { setSearchType("title"); setTempMovies([]) }} className={searchType === "title" ? "text-white text-xl rounded-lg p-2 bg-blue-600" : "text-white text-xl rounded-lg p-2 bg-gray-400"}>Search Titles</button>
                <button onClick={() => { setSearchType("random"); setTempMovies([]) }} className={searchType === "random" ? "text-white text-xl rounded-lg p-2 bg-blue-600" : "text-white text-xl rounded-lg p-2 bg-gray-400"}>Random Search</button>
            </div>
            <div className="grid grid-cols-1 gap-5 text-center text-black m-auto p-4">
                {searchType === "title" && <input type="text" name="name" autoComplete="off" required placeholder="Title" className="bg-gray-800 text-white text-center w-[500px] m-auto rounded-lg p-2 text-xl "
                    onChange={(e) => { e.target.scrollIntoView(); makePreviewMovies(e.target.value, setTempMovies); }} />}
                {searchType === "random" &&
                    <div className="grid grid-cols-3 gap-2 w-[100%] p-2 m-auto">
                        {ChooseGenre(chosenGenre, setChosenGenre)}
                        {ChooseDirector(chosenDirector, directors, setDirectors, setChosenDirector)}
                        {ChooseActors(chosenActors, setChosenActors, actors, setActor)}
                        <button className="bg-red-500 text-white text-xl rounded-lg p-2 col-span-3" onClick={() => { getRandomMovies(setTempMovies, tempMovies, { genre: chosenGenre, director: chosenDirector, actors: chosenActors }); }}>
                            Show Random Movies
                        </button>
                    </div>
                }
                <div className="top-5" onChange={(e) => (e.target as HTMLElement).scrollIntoView()}>{previewTiles}</div>
            </div >
        </div >
    );
}

