import express from "express";
import cors from "cors";
import "express-async-errors";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());


// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const moviesFilePath = "./public/movies-list.json";

app.post("/add-movie", async (req, res) => {
    const newMovie = req.query;
    console.log(newMovie);
    const newMovieName = newMovie.name;
    const newMovieId = newMovie.id;
    console.log(newMovieName);
    fs.readFile(moviesFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read movies list" });
        }
        const movies = JSON.parse(data);
        const newMovies = movies.filter(movie => movie.id !== newMovieId);
        newMovies.push(newMovie);

        fs.writeFile(moviesFilePath, JSON.stringify(newMovies, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to save movie" });
            }

            res.status(201).json({ message: "Movie added successfully" });
        });
    });
});

app.post("/delete-movie", async (req, res) => {
    const movieId = req.query.id;
    console.log("deleteing " + movieId);
    fs.readFile(moviesFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read movies list" });
        }
        const movies = JSON.parse(data);
        const newMovies = movies.filter(movie => movie.id !== movieId);

        fs.writeFile(moviesFilePath, JSON.stringify(newMovies, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to save movie" });
            }

            res.status(201).json({ message: "Movie deleted successfully" });
        });
    });
}
);



app.listen(port, () => {
    console.log("Server is running on port " + port);
});