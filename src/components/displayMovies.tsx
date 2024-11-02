"use client"
import { useEffect, useState } from "react";
import { getMoviesList, removeMovie } from "./movieList";
import { MoreInfoPopup, makeStars } from "./MoreInfoPopup";
//import MoreInfoPopup from "./MoreInfoPopup";


export function previewMovie(m: Movie, clickAddMovie: any, setPreviewTile: any, setSelectedMovie: any) {
    //display a movie in a tile
    if (m.image === null) {
        return null;
    }
    return (
        <div key={"" + m.id} className='flex flex-col border border-red-100 rounded-xl hover:cursor-pointer overflow-hidden gap-1 items-center' onClick={() => clickAddMovie(m, setPreviewTile)
        } >
            <div className="relative w-full">
                <img className="object-cover w-full" src={m.image} alt={m.name} />
                <button className="absolute top-2 right-2 px-5 py-2 text-lg bg-blue-700 text-white rounded-lg italic " onClick={(e) => { e.stopPropagation(); setSelectedMovie(m) }}>i</button>
            </div>
            <div className="w-[100%] h-[50px]  justify-center overflow-hidden flex">
                <h1 className="m-auto align-middle text-white ">{m.name + " (" + m.year + ")"}</h1>
            </div>
            {makeStars(m.reviewScore)}
        </div >);
}
function displayMovie(setMovieList: any, m: Movie, setSelectedMovie: any, username: string) {
    //display a movie in a tile

    function remove(e: React.MouseEvent<HTMLButtonElement>, setMovieList: any, id: number) {
        e.stopPropagation();
        removeMovie(setMovieList, id, username);
    }
    return (
        <div key={"" + m.id} className='flex flex-col border border-red-100 rounded-xl hover:cursor-pointer overflow-hidden gap-1' onClick={() => setSelectedMovie(m)}>
            <img className=" object-cover " src={m.image} alt={m.name} />
            <h1 className="items-center text-center h-[50px] overflow-hidden">{m.name + " (" + m.year + ")"}</h1>
            {makeStars(m.reviewScore)}
            <button className='text-white text-lg bg-red-500 rounded-lg w-[100%] h-[40px] float-end' onClick={(e) => remove(e, setMovieList, m.id)}>Remove</button>
        </div>
    );
}
export default function DisplayMovies(setMovieList: any, movieList: Movie[], username: string, setSelectedMovie: any) {


    useEffect(() => {
        getMoviesList(username).then((data) => {
            setMovieList(data);
        })
    }, []);

    return (
        <div className={"grid  w-[vw] gap-[10px] bg-slate-700 m-auto p-2 rounded-xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10"}>
            {
                movieList ? movieList.map((movie: Movie) => {
                    return (displayMovie(setMovieList, movie, setSelectedMovie, username));
                }) : "Loading..."
            }
        </div >
    );
}

