"use client"
import { Dispatch, MouseEvent, SetStateAction, use, useEffect, useState } from "react";
import { getMoviesList, removeMovie } from "./movieList";
import { get } from "http";
import { log } from "console";
import { writer } from "repl";
import { MoreInfoPopup } from "./MoreInfoPopup";
import { stringify } from "querystring";
//import MoreInfoPopup from "./MoreInfoPopup";


export function previewMovie(m: Movie, clickAddMovie: any, setPreviewTile: any) {
    //display a movie in a tile
    if (m.image === null) {
        return null;
    }
    return (
        <div key={m.id} className='flex flex-col border border-red-100 rounded-xl hover:cursor-pointer overflow-hidden gap-1' onClick={() => clickAddMovie(m, setPreviewTile)}>
            <img className=" object-cover " src={m.image} alt={m.name} />
            <h1 className="items-center text-center m-auto max-h-[50px] text-white">{m.name + " (" + m.year + ")"}</h1>
        </div>);
}
function displayMovie(setMovieList: any, m: Movie, setSelectedMovie: any) {
    //display a movie in a tile

    function remove(e: React.MouseEvent<HTMLButtonElement>, setMovieList: any, id: number) {
        e.stopPropagation();
        removeMovie(setMovieList, id);
    }
    return (
        <div key={m.id} className='flex flex-col border border-red-100 rounded-xl hover:cursor-pointer overflow-hidden gap-1' onClick={() => setSelectedMovie(m)}>
            <img className=" object-cover " src={m.image} alt={m.name} />
            <h1 className="items-center text-center m-auto max-h-[50px]">{m.name + " (" + m.year + ")"}</h1>
            <button className='text-white text-lg bg-red-500 rounded-lg w-[100%] h-[60px] float-end' onClick={(e) => remove(e, setMovieList, m.id)}>Remove</button>
        </div>
    );
}
export default function DisplayMovies(setMovieList: any, movieList: Movie[]) {

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    useEffect(() => {
        getMoviesList().then((data) => {
            setMovieList(data);
        }
        )
    }, []);

    return (
        <div className={"grid  w-[vw] gap-[10px] bg-slate-700 m-auto p-2 rounded-xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10"}>
            {
                movieList ? movieList.map((movie: Movie) => {
                    return (displayMovie(setMovieList, movie, setSelectedMovie));
                }) : "Loading..."}
            {MoreInfoPopup(selectedMovie, setSelectedMovie)}
        </div >
    );
}

