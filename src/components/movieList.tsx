"use client"
import React, { useState } from 'react';



export async function getMoviesList() {
    const moviesList = await fetch("./movies-list.json");
    return moviesList.json();
}

export function refreshMovies(setMovieList) {
    getMoviesList().then((data) => {
        setMovieList(data);
        console.log(data);
    });
}

export function removeMovie(setMovieList, id: number) {
    //remove a movie from the database
    const request = "http://localhost:3002/delete-movie?id=" + id;
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
    setTimeout(() => refreshMovies(setMovieList), 100);
}

