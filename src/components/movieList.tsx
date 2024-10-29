"use client"
import React, { useState } from 'react';
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, DocumentData, DocumentReference, deleteDoc, setDoc } from 'firebase/firestore';
import { set } from 'firebase/database';
interface FirebaseMovie {
    description: string;
    id: number;
    image: string;
    name: string;
    year: number;
}
export async function getMoviesList() {
    //get all the movies from firestore db called "movies"
    const moviesCollection = collection(db, 'movies');
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
            year: doc.year
        };
        movies.push(movie);
    });
    return movies;
}

export function refreshMovies(setMovieList: any) {
    getMoviesList().then((data) => {
        setMovieList(data);
    });
}

export function removeMovie(setMovieList: any, id: number) {
    //remove a movie from the database
    const moviesCollection = collection(db, 'movies');
    const docRef = doc(moviesCollection, id.toString());
    //delete the doc with the id
    console.log("deleting doc with id: " + id);
    deleteDoc(docRef).then(() => {
        refreshMovies(setMovieList);
    });
}

export function addMovie(m: Movie) {

    const moviesCollection = collection(db, 'movies');
    const docRef = doc(moviesCollection, m.id.toString());
    //add a movie to the database
    console.log("adding movie: " + m.name);
    const newMovie: Movie = {
        description: m.description,
        id: m.id,
        image: m.image,
        name: m.name,
        year: m.year
    }
    //add the doc with the id
    return setDoc(docRef, newMovie);
}