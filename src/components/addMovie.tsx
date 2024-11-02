"use client"

import { SetStateAction, use, useEffect, useRef, useState } from "react";
import { refreshMovies, addMovie } from "./movieList";
import { previewMovie } from "./displayMovies";
import { raw } from "body-parser";
import { getMovieDirectors } from "./MoreInfoPopup";
import { get } from "http";


//find the poster image for a movie
async function getMovieData(name: string) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + name);
    return response.json();
}

function makePreviewTiles(movies: Movie[], clickAddMovie: (m: Movie, setPreviewTile: any) => void, setPreviewTile: any, setSelectedMovie: any) {
    //wait for the movies to be loaded 
    return (
        <div className="grid  gap-4 p-[10px] rounded-xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
            {movies.map((movie) => {
                return previewMovie(movie, clickAddMovie, setPreviewTile, setSelectedMovie);
            }
            )}
        </div>
    );
}

function getRandomMovies(setTheRandMovies: any, tempMovies: any, options: { genre: string, director: number, actors: number }) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const allMovies: Movie[] = [];
    setTheRandMovies([]);
    //(options);
    let request = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key;
    if (options.actors && options.actors !== -1) {
        request += "&with_cast=" + options.actors;
    }
    if (options.director && options.director !== -1) {
        request += "&with_crew=" + options.director;
    }
    if (options.genre && options.genre !== "none") {
        request += "&with_genres=" + options.genre;
    }

    for (let i = 1; i < 10; i++) {
        const newReq = request + "&page=" + i;
        //console.log(newReq);

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
                    const rawMovie = movies[i];
                    //if adult content, skip
                    if (rawMovie.adult) {
                        continue;
                    }
                    if (rawMovie.poster_path === null) {
                        continue;
                    }
                    //setTimeout(() => {
                    getMovieDirectors(rawMovie.id).then((directorData) => {
                        const directors: number[] = [];
                        directorData.forEach((director: { id: number; name: string; }) => {
                            directors.push(director.id);
                        });
                        //ignore movie if director is not the one we want
                        console.log(rawMovie);
                        const formattedMovie = {
                            id: rawMovie.id,
                            name: rawMovie.title,
                            image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + rawMovie.poster_path,
                            description: rawMovie.overview,
                            year: rawMovie.release_date.split('-')[0],
                            dateAdded: new Date(),
                            reviewScore: rawMovie.vote_average,
                            directors: directors
                        };
                        allMovies.push(formattedMovie);
                        //console.log(allMovies);
                        setTheRandMovies(allMovies);
                    });
                    //}, 1000);
                }
            });
        });
    }
}


function getPossibleDirector(value: string, setDirectors: any) {
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
                data.results.sort((a: { popularity: number; }, b: { popularity: number; }) => {
                    return b.popularity - a.popularity;
                });
                setDirectors(data);
            });
        });
    }, 500);
}

function getPossibleActor(value: string, setActors: any) {
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
                data.results.sort((a: { popularity: number; }, b: { popularity: number; }) => {
                    return b.popularity - a.popularity;
                });
                setActors(data.results);
            });
        });
    }, 500);
}

function ChooseDirector(chosenDirector: any, directors: any, setDirectors: any, setChosenDirector: any) {
    const defaultDirectors = [
        { name: "Select Director", id: -1, label: "Select Director" },
        { name: "Steven Spielberg", id: 488, label: "Steven Spielberg" },
        { name: "Martin Scorsese", id: 1032, label: "Martin Scorsese" },
        { name: "Christopher Nolan", id: 525, label: "Christopher Nolan" },
        { name: "Quentin Tarantino", id: 233, label: "Quentin Tarantino" },
        { name: "Tim Burton", id: 510, label: "Tim Burton" },
        { name: "Ridley Scott", id: 578, label: "Ridley Scott" },
        { name: "James Cameron", id: 2710, label: "James Cameron" },
        { name: "David Fincher", id: 7467, label: "David Fincher" },
        { name: "Peter Jackson", id: 1392, label: "Peter Jackson" },
    ]
    return (
        <select className="text-white text-xl rounded-lg bg-gray-800 text-center p-2" value={chosenDirector} onChange={(e) => setChosenDirector(Number(e.target.value))} >
            {
                defaultDirectors.map((director) => {
                    return <option key={director.name} value={director.id}>{director.name}</option>
                }
                )
            }
        </ select>
    );
}
function ChooseGenre(chosenGenre: string, setChosenGenre: any) {
    const genres = new Map<string, number>([
        ["Select Genre", -1],
        ["Action", 28],
        ["Adventure", 12],
        ["Animation", 16],
        ["Comedy", 35],
        ["Crime", 80],
        ["Documentary", 99],
        ["Drama", 18],
        ["Family", 10751],
        ["Fantasy", 14],
        ["History", 36],
        ["Horror", 27],
        ["Music", 10402],
        ["Mystery", 9648],
        ["Romance", 10749],
        ["Science Fiction", 878],
        ["TV Movie", 10770],
        ["Thriller", 53],
        ["War", 10752],
        ["Western", 37]
    ]);

    return (
        <select className="text-white text-xl rounded-lg bg-gray-800 text-center p-2" name="genre" value={chosenGenre} onChange={(e) => setChosenGenre(e.target.value)}>
            <option value="none">Select Genre</option>
            {Array.from(genres.keys()).map((genre) => {
                return <option key={genre} value={genres.get(genre)}>{genre}</option>
            })}
        </select>
    );
}

function ChooseActors(chosenActors: any, setChosenActors: any, actors: any, setActors: any) {
    const defaultActors = [
        { name: "Select Actor", id: -1, label: "Select Actor" },
        { name: "Tom Hanks", id: 31, label: "Tom Hanks" },
        { name: "Robert De Niro", id: 380, label: "Robert De Niro" },
        { name: "Samuel L. Jackson", id: 2231, label: "Samuel L. Jackson" },
        { name: "Morgan Freeman", id: 192, label: "Morgan Freeman" },
        { name: "Harrison Ford", id: 2, label: "Harrison Ford" },
        { name: "Johnny Depp", id: 85, label: "Johnny Depp" },
        { name: "Bruce Willis", id: 62, label: "Bruce Willis" },
        { name: "Brad Pitt", id: 287, label: "Brad Pitt" },
        { name: "Leonardo DiCaprio", id: 6193, label: "Leonardo DiCaprio" },
        { name: "Will Smith", id: 2888, label: "Will Smith" },
        { name: "Denzel Washington", id: 5292, label: "Denzel Washington" },
        { name: "Tom Cruise", id: 500, label: "Tom Cruise" },
        { name: "Keanu Reeves", id: 6384, label: "Keanu Reeves" },
        { name: "Nicolas Cage", id: 2963, label: "Nicolas Cage" },
        { name: "Matt Damon", id: 1283, label: "Matt Damon" },
        { name: "Mark Wahlberg", id: 3223, label: "Mark Wahlberg" },
        { name: "Christian Bale", id: 3894, label: "Christian Bale" },
        { name: "Robert Downey Jr.", id: 3223, label: "Robert Downey Jr." },
        { name: "Chris Evans", id: 164835, label: "Chris Evans" },
        { name: "Chris Hemsworth", id: 74568, label: "Chris Hemsworth" },
        { name: "Chris Pratt", id: 73457, label: "Chris Pratt" },
        { name: "Scarlett Johansson", id: 1245, label: "Scarlett Johansson" },
        { name: "Jennifer Lawrence", id: 72129, label: "Jennifer Lawrence" },
    ]
    return (
        <select className="text-white text-xl rounded-lg bg-gray-800 text-center p-2" value={chosenActors} onChange={(e) => setChosenActors(Number(e.target.value))
        } >
            {defaultActors.map((actor) => {
                return <option key={actor.name} value={actor.id}>{actor.name}</option>
            })}
        </ select >
    );
}



function makePreviewMovies(target: EventTarget & HTMLInputElement, setTwentyMovies: any) {
    const name = target.value;
    //wait one second and check if target has changed
    const formattedMovies: Movie[] = [];
    setTimeout(() => {
        if (name != target.value) {
            return;
        }
        if (name.length < 3) {
            setTwentyMovies(null);
            return;
        }
        getMovieData(name).then((data) => {
            if (data.results.length === 0) {
                setTwentyMovies(null);
                return;
            }

            //sort the list by popularity
            const sortedMovies = data.results.sort((a: { vote_count: number; }, b: { vote_count: number; }) => {
                return b.vote_count - a.vote_count;
            });
            for (let i = 0; i < sortedMovies.length; i++) {
                //console.log(sortedMovies[i]);
                const rawMovie = sortedMovies[i];
                getMovieDirectors(rawMovie.id).then((directorData) => {
                    const directors: number[] = [];
                    directorData.forEach((director: { id: number; name: string; }) => {
                        directors.push(director.id);
                    });
                    if (rawMovie.adult) {
                        return;
                    }
                    if (rawMovie.poster_path === null) {
                        return;
                    }
                    const formattedMovie = {
                        id: rawMovie.id,
                        name: rawMovie.title,
                        image: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + rawMovie.poster_path,
                        description: rawMovie.overview,
                        year: rawMovie.release_date.split('-')[0],
                        dateAdded: new Date(),
                        reviewScore: rawMovie.vote_average,
                        directors: directors
                    };
                    formattedMovies.push(formattedMovie);
                    //console.log("formattedMovies");
                    //console.log(formattedMovies);
                    setTwentyMovies(formattedMovies);
                });
            }

        }
        );
    }, 500);
}

export default function AddMovie(setMovieList: any, username: string, setSelectedMovie: any) {
    //make a default movie
    const [previewTiles, setPreviewTile] = useState<JSX.Element | null>(null);
    const [chosenGenre, setChosenGenre] = useState<string>("");
    const [directors, setDirectors] = useState<{ id: number; name: string } | null>(null);
    const [chosenDirector, setChosenDirector] = useState<number>(-1);
    const [searchType, setSearchType] = useState<string>("title");
    const [tempMovies, setTempMovies] = useState<Movie[]>();
    const [twentyMovies, setTwentyMovies] = useState<Movie[]>();

    const [actors, setActor] = useState<{ id: number; name: string } | null>(null);
    const [chosenActors, setChosenActors] = useState<number>(-1);

    function clickAddMovie(m: Movie, setPreviewTile: any) {
        addMovie(m, username);
        setTimeout(() => refreshMovies(setMovieList, username), 100);
    }

    let moviesTimeout: NodeJS.Timeout | null = null;
    function setTheMovies(movies: Movie[]) {
        if (moviesTimeout) {
            clearTimeout(moviesTimeout);
        }
        moviesTimeout = setTimeout(() => {
            setTwentyMovies(movies);
        }, 100);
    }

    let randTimeout: NodeJS.Timeout | null = null;
    function setTheRandMovies(movies: Movie[]) {
        if (randTimeout) {
            clearTimeout(randTimeout);
        }
        randTimeout = setTimeout(() => {
            setTempMovies(movies);
            //console.log("randMovies");
            //console.log(movies);
        }, 1000);
    }

    useEffect(() => {
        if (searchType == "random" && tempMovies) {
            //check if the director matches a director we want
            let filteredMovies = tempMovies;
            if (chosenDirector && chosenDirector !== -1) {
                filteredMovies = filteredMovies.filter((movie) => {
                    return movie.directors.includes(chosenDirector);
                });
            }
            const twentyRandomMovies: Movie[] = [];
            for (let i = 0; i < Math.min(filteredMovies.length, 20); i++) {
                const randIndex = Math.floor(Math.random() * filteredMovies.length);
                if (twentyRandomMovies.includes(filteredMovies[randIndex]))
                    i--;
                else
                    twentyRandomMovies.push(filteredMovies[randIndex]);
            }
            setTheMovies(twentyRandomMovies);
        }

    }, [tempMovies]);

    useEffect(() => {
        if (twentyMovies == null)
            setPreviewTile(null);
        if (twentyMovies) {
            //console.log("twentyMovies");
            //console.log(twentyMovies);
            setPreviewTile(makePreviewTiles(twentyMovies, clickAddMovie, setPreviewTile, setSelectedMovie));
        }
    }, [twentyMovies]);



    return (
        <div className="w-[vw] bg-slate-600 top-5 rounded-lg">
            <div className="grid grid-cols-2 gap-2 p-2 max-w-[1000px] m-auto">
                <button onClick={() => { setSearchType("title"); setTwentyMovies([]) }} className={searchType === "title" ? "text-white text-xl rounded-lg p-2 bg-blue-600" : "text-white text-xl rounded-lg p-2 bg-gray-400"}>Search Titles</button>
                <button onClick={() => { setSearchType("random"); setTwentyMovies([]) }} className={searchType === "random" ? "text-white text-xl rounded-lg p-2 bg-blue-600" : "text-white text-xl rounded-lg p-2 bg-gray-400"}>Random Search</button>
            </div>
            <div className="grid grid-cols-1 gap-5 text-center text-black m-auto p-4">
                {searchType === "title" && <input type="text" name="name" autoComplete="off" required placeholder="Title" className="bg-gray-800 text-white text-center w-[500px] m-auto rounded-lg p-2 text-xl "
                    onChange={(e) => { e.target.scrollIntoView(); makePreviewMovies(e.target, setTheMovies); }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && tempMovies && tempMovies.length > 0) {
                            clickAddMovie(tempMovies[0], setPreviewTile);
                        }
                    }} />}
                {searchType === "random" &&
                    <div className="grid grid-cols-3 gap-2 w-[100%] p-2 m-auto">
                        {ChooseGenre(chosenGenre, setChosenGenre)}
                        {ChooseDirector(chosenDirector, directors, setDirectors, setChosenDirector)}
                        {ChooseActors(chosenActors, setChosenActors, actors, setActor)}
                        <button className="bg-red-500 text-white text-xl rounded-lg p-2 col-span-3" onClick={() => { getRandomMovies(setTheRandMovies, tempMovies, { genre: chosenGenre, director: chosenDirector, actors: chosenActors }); }}>
                            Show Random Movies
                        </button>
                    </div>
                }
                <div className="top-5" onChange={(e) => (e.target as HTMLElement).scrollIntoView()}>{previewTiles}</div>
            </div >
        </div >
    );
}

