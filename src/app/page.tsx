"use client"
import AddMovie from "@/components/addMovie";
import DisplayMovies from "@/components/displayMovies";
import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGI5Z8KKCj-JnbBzyqsniGXQPMaUo3g5o",
  authDomain: "moviewatchlist-3831d.firebaseapp.com",
  projectId: "moviewatchlist-3831d",
  storageBucket: "moviewatchlist-3831d.appspot.com",
  messagingSenderId: "469596024562",
  appId: "1:469596024562:web:d8e9d01537ae65f58baa6b",
  measurementId: "G-N4MDRQRFNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default function Home() {
  const [movieList, setMovieList] = useState<Movie[] | null>();
  return (
    <div>
      <div className="flex flex-row h-[100px] w-[1000px] m-auto align-middle">
        <img className="h-[100px] rounded-lg" src="./logo.webp" alt="logo" />
        <h1 className="m-auto">Movie List Website</h1>
      </div>
      <DisplayMovies setMovieList={setMovieList} movieList={movieList} />
      <AddMovie setMovieList={setMovieList} />
      <div className="flex flex-row m-auto w-[1000px] text-center">
        <p>special thanks to</p>
        <img className="w-[100px]" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb" />
      </div>
    </div>
  );
}
