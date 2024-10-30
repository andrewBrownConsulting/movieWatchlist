"use client"
import { db } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs, DocumentData, DocumentReference, deleteDoc, setDoc } from 'firebase/firestore';

interface FirebaseMovie {
    description: string;
    id: number;
    image: string;
    name: string;
    year: number;
    dateAdded: Date;
}
export async function getMoviesList(username: string) {
    if (username === "") {
        return [];
    }
    //get all the movies from firestore db called "movies"
    const moviesCollection = collection(db, username);
    //print all the docs in the collection
    const docs: DocumentData[] = [];
    const snapshot = await getDocs(moviesCollection);
    snapshot.forEach((doc) => {
        docs.push(doc.data());
    });
    let movies: FirebaseMovie[] = [];
    docs.forEach((doc) => {
        let movie: FirebaseMovie = {
            description: doc.description,
            id: doc.id,
            image: doc.image,
            name: doc.name,
            year: doc.year,
            dateAdded: doc.dateAdded
        };
        movies.push(movie);
    });
    //sort the movies by date added
    movies.sort((a, b) => {
        return Number(a.dateAdded) - Number(b.dateAdded);
    });

    return movies;
}

export function refreshMovies(setMovieList: any, username: string) {
    getMoviesList(username).then((data) => {
        setMovieList(data);
    });
}

export function removeMovie(setMovieList: any, id: number, username: string) {
    //remove a movie from the database
    const moviesCollection = collection(db, username);
    const docRef = doc(moviesCollection, id.toString());
    //delete the doc with the id
    console.log("deleting doc with id: " + id);
    deleteDoc(docRef).then(() => {
        refreshMovies(setMovieList, username);
    });
}

export function addMovie(m: Movie, username: string) {

    const moviesCollection = collection(db, username);
    const docRef = doc(moviesCollection, m.id.toString());
    //add a movie to the database
    console.log("adding movie: " + m.name);
    const date = new Date();
    const newMovie: Movie = {
        description: m.description,
        id: m.id,
        image: m.image,
        name: m.name,
        year: m.year,
        dateAdded: date
    }
    //add the doc with the id
    return setDoc(docRef, newMovie);
}