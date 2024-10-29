"use client"
import AddMovie from "@/components/addMovie";
import DisplayMovies from "@/components/displayMovies";
import { useState } from "react";
import { app } from "@/firebaseConfig";

export default function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  return (
    <div>
      <div className="flex flex-row h-[100px] w-[1000px] m-auto align-middle">
        <img className="h-[100px] rounded-lg" src="./logo.webp" alt="logo" />
        <h1 className="m-auto">Movie List Website</h1>
      </div>
      {DisplayMovies(setMovieList, movieList)}
      {AddMovie(setMovieList)}
      <div className="flex flex-row m-auto w-[1000px] text-center">
        <p>special thanks to</p>
        <img className="w-[100px]" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb" />
      </div>
    </div>
  );
}
