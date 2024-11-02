"use client"
import AddMovie from "@/components/addMovie";
import DisplayMovies from "@/components/displayMovies";
import { MoreInfoPopup } from "@/components/MoreInfoPopup";
import { refreshMovies } from "@/components/movieList";
import { useState, useEffect } from "react";

export default function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [username, setUsername] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  function login(username: string) {
    refreshMovies(setMovieList, username);
    //store the username in local storage
    localStorage.setItem("username", username);
  }
  //get the username from local storage
  useEffect(() => {
    let username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
      login(username);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        //console.log("esc");
        setSelectedMovie(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (

    <div>

      <div className="flex flex-row h-[100px] w-[1000px] m-auto align-middle">
        <img className="h-[100px] rounded-lg" src="./logo.webp" alt="logo" />
        <h1 className="m-auto">Movie List Website</h1>
        <div className="m-auto">
          <input
            className="m-auto bg-gray-700 text-white p-2 rounded-lg"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                login(username);
              }
            }}
          />
          <button
            className="m-auto bg-red-500 text-white rounded-lg p-2"
            onClick={() => login(username)}
          >
            Sign In
          </button>
        </div>
      </div>
      {DisplayMovies(setMovieList, movieList, username, setSelectedMovie)}
      {AddMovie(setMovieList, username, setSelectedMovie)}
      {MoreInfoPopup(selectedMovie, setSelectedMovie)}
      <div className="flex flex-row m-auto w-[1000px] text-center">
        <p>special thanks to</p>
        <img className="w-[100px]" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb" />
      </div>
    </div>
  );
}
