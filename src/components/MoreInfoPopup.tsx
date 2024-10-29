"use client";
import { time } from "console";
import { TIMEOUT } from "dns";
import { useState, useEffect } from "react";

export async function getMovieDirectors(movieId) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key;
    const response = await fetch(request);
    const data = await response.json();
    const directors = data.crew.filter((person) => person.job === "Director");
    return directors;
}
function getMovieCastAndCrew(movieId, setCast, setDirectors, setWriters) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key;
    fetch(request).then((req) => {
        req.json().then((data) => {
            const cast = data.cast.slice(0, 6);
            const directors = data.crew.filter((person) => person.job === "Director");
            const writers = data.crew.filter((person) => person.job === "Screenplay" || person.job === "Writer").slice(0, 4);

            setCast(cast);
            setDirectors(directors);
            setWriters(writers);
        });
    });
}

function getMovieTrailer(movieId: number, setTrailer) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=" + api_key;
    fetch(request).then((req) => {
        req.json().then((data) => {
            if (data.results.length === 0) {
                setTrailer(null);
                return;
            }
            let trailers = data.results.filter((trailer) => trailer.type === "Trailer");
            if (trailers.length === 0) {
                trailers = data.results;
            }
            const index = Math.floor(Math.random() * trailers.length);
            const trailerId = trailers[index].key;

            const url = "https://www.youtube.com/embed/" + trailerId;

            setTrailer(url);
            console.log(data);
            console.log(url);
        });
    });
}

async function getRuntimeProductionCompanies(movieId: number, setRuntime, setProductionCompanies, setGenres, setCountry, setWebsite) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + api_key;

    const countryAbbrToName = {
        "US": "United States",
        "GB": "United Kingdom",
        "CA": "Canada",
        "AU": "Australia",
        "DE": "Germany",
        "FR": "France",
        "IT": "Italy",
        "JP": "Japan",
        "KR": "South Korea",
        "CN": "China",
        "RU": "Russia",
        "IN": "India",
        "BR": "Brazil",
        "MX": "Mexico",
        "ES": "Spain",
        "SE": "Sweden",
        "NL": "Netherlands",
        "DK": "Denmark",
        "NO": "Norway",
        "FI": "Finland",
        "BE": "Belgium",
        "IE": "Ireland",
        "CH": "Switzerland",
        "AT": "Austria",
        "PT": "Portugal",
        "PL": "Poland",
        "HU": "Hungary",
        "CZ": "Czech Republic",
        "GR": "Greece",
        "TR": "Turkey",
        "SG": "Singapore",
        "HK": "Hong Kong",
        "TH": "Thailand",
        "ID": "Indonesia",
        "PH": "Philippines",
        "AR": "Argentina",
        "CL": "Chile",
        "CO": "Colombia",
        "PE": "Peru",
        "ZA": "South Africa",
        "EG": "Egypt"
    };

    setRuntime(null);
    setProductionCompanies(null);
    setGenres(null);
    setCountry(null);
    setWebsite(null);
    fetch(request).then((req) => {
        req.json().then((data) => {
            console.log(data);
            const companies = data.production_companies;
            let runtime = data.runtime;
            //convert runtime to hours and minutes
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            runtime = hours + "h " + minutes + "m";
            setRuntime(runtime);

            let logos = companies.map((company) => {
                if (company.logo_path === null) {
                    return null;
                }
                return "https://image.tmdb.org/t/p/original" + company.logo_path;
            });
            logos = logos.filter((logo) => logo !== null);
            logos = logos.slice(0, 5);
            setProductionCompanies(logos);

            const genres = data.genres.map((genre) => genre.name);
            setGenres(genres);
            const countries = [];
            data.production_countries.forEach((country) => {
                countries.push(countryAbbrToName[country.iso_3166_1]);
            });
            setCountry(countries);
            if (data.homepage)
                setWebsite(data.homepage);
        });
    });
}

function getStreamingAvailability(movieId: number, setStreamingAvailability, setBuyingAvailability, setLink) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${api_key}`
    fetch(request).then((req) => {
        req.json().then((data) => {
            setStreamingAvailability(null);
            setBuyingAvailability(null);
            setLink(null);
            console.log(data);
            const gbResults = data.results.GB;
            let streamingAvailability = null;
            if (gbResults) {
                if (gbResults.flatrate)
                    setStreamingAvailability(gbResults.flatrate);
                if (gbResults.rent)
                    setBuyingAvailability(gbResults.rent);
                setLink(gbResults.link);
            }
        });
    });
}

function streamingWidget(streamingAvailability, rentingAvailability, link) {
    if (!streamingAvailability && !rentingAvailability) {
        return (<h2 className="m-auto hover:cursor-text">Not available to stream or rent</h2>);
    }
    console.log("rentingAvailability len = " + rentingAvailability?.length);
    if (streamingAvailability?.length > 0) {
        return (
            <div className="grid grid-cols-1">
                {streamingAvailability?.length > 0 ? <h2 className="m-auto hover:cursor-text">Streaming Availability:</h2> : null}
                <div className={"grid gap-1 grid-cols-" + (streamingAvailability ? streamingAvailability.length : 1)}>
                    {streamingAvailability ? streamingAvailability.map((stream) => {
                        return (<a href={link}><img className="m-auto h-[50px]" src={"https://image.tmdb.org/t/p/original" + stream.logo_path} /></a>);
                    }
                    ) : "Not available to stream"}
                </div>
            </div>);
    }
    return (
        <div className="grid grid-cols-1">
            {rentingAvailability?.length > 0 ? <h2 className="m-auto hover:cursor-text">Renting Availability:</h2> : null}
            <div className={"grid gap-1 grid-cols-" + (rentingAvailability ? Math.min(rentingAvailability.length, 4) : 1)}>
                {rentingAvailability ? rentingAvailability.map((buy) => {
                    return (<a href={link}><img className="m-auto h-[50px]" src={"https://image.tmdb.org/t/p/original" + buy.logo_path} /></a>);
                }
                ) : "Not available to rent"}
            </div>
        </div >);

}

function castCrewWidget(cast, directors, writers) {
    return (
        <div className="grid grid-cols-1">
            <h2 className='m-auto hover:cursor-text grid '> Cast: </h2>
            <div className="grid grid-cols-2 gap-1">
                {cast ? cast.map((person) => {
                    return (<p className="text-center hover:cursor-text" key={person.id}>{person.name} </p>);
                }
                ) : "Loading..."}
            </div>
            <h2 className='m-auto hover:cursor-text'> {directors?.length > 1 ? "Directors:" : "Director:"}</h2>
            <div className={"grid gap-1 grid-cols-" + Math.min(directors?.length ?? 0, 3)}>
                {directors ? directors.map((person) => {
                    return (<p className="text-center hover:cursor-text" key={person.id}>{person.name} </p>);
                }
                ) : "Loading..."}
            </div>
            <h2 className='m-auto hover:cursor-text'> {writers?.length > 1 ? "Writers:" : "Writer:"} </h2>
            <div className={"grid gap-1 grid-cols-" + Math.min(writers?.length ?? 0, 3)}>
                {writers ? writers.map((person) => {
                    return (<p className="text-center hover:cursor-text" key={person.id}>{person.name} </p>);
                }
                ) : "Loading..."}
            </div>
        </div>
    );
}
export function MoreInfoPopup(m: Movie, setSelectedMovie) {

    function handleChildElementClick(e) {
        e.stopPropagation();
        // Do other stuff here
    }

    //const cast = null;
    //display a popup with more information
    const [cast, setCast] = useState(null);
    const [directors, setDirectors] = useState(null);
    const [writers, setWriters] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [productionCompanies, setProductionCompanies] = useState(null);
    const [runtime, setRuntime] = useState(null);
    const [streamingAvailability, setStreamingAvailability] = useState(null);
    const [rentingAvailability, setRentingAvailability] = useState(null);
    const [link, setLink] = useState(null);
    const [genres, setGenres] = useState<string[] | null>(null);
    const [countries, setCountries] = useState<string[] | null>(null);
    const [website, setWebsite] = useState(null);

    if (!m) {
        useEffect(() => {
            setCast(null);
            setDirectors(null);
            setWriters(null);
            setTrailer(null);
        }, [m]
        );
        return null;
    }

    useEffect(() => {
        getMovieCastAndCrew(m.id, setCast, setDirectors, setWriters);
        getMovieTrailer(m.id, setTrailer);
        getRuntimeProductionCompanies(m.id, setRuntime, setProductionCompanies, setGenres, setCountries, setWebsite);
        getStreamingAvailability(m.id, setStreamingAvailability, setRentingAvailability, setLink);
    }, [m]);



    return (
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] z-10 bg-[rgba(255,255,255,0.15)] hover:cursor-pointer" onClick={() => setSelectedMovie(null)}>
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-slate-500 z-20 rounded-[50px] p-10 hover:cursor-default" onClick={(e) => handleChildElementClick(e)}>
                <div className="grid grid-cols-1  xl:grid-cols-3 gap-5 h-[100%] overflow-auto">
                    <img className="m-auto max-h-[400px] xl:max-h-[90%]" src={m.image} alt={m.name} />
                    <div className="grid grid-cols-1 gap-2 m-auto" >
                        {website != null ?
                            <a href={website} className="m-auto text-xl hover:cursor-pointer">
                                <h1 className="m-auto text-xl  text-center"> {m.name + " (" + m.year + ")"} </h1>
                            </a> : <h1 className="m-auto text-xl hover:cursor-text text-center"> {m.name + " (" + m.year + ")"} </h1>
                        }
                        <h2 className='m-auto hover:cursor-text text-center'> {m.description} </h2>
                        <h2 className="m-auto text-[20px] hover:cursor-text">{runtime}</h2>
                        <h2 className="m-auto text-[20px] hover:cursor-text">
                            {//display genres with commas
                                genres ? genres.join(", ") : "Loading..."
                            }
                        </h2>
                        <h4 className="m-auto text-[15px] hover:cursor-text text-center">
                            {countries ? countries.join(", ") : "Loading..."}
                        </h4>
                        <div className={"grid max-h-[100px] gap-3 grid-cols-" + Math.min(productionCompanies?.length, 4)}>
                            {productionCompanies ? productionCompanies.map((logo) => {
                                return <img className="m-auto max-h-[100px] " src={logo} />;
                            }
                            ) : "Loading..."}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {castCrewWidget(cast, directors, writers)}
                        {trailer && <iframe src={trailer} className="m-auto w-[100%] max-w-[500px] aspect-video" allowFullScreen />}
                        {streamingWidget(streamingAvailability, rentingAvailability, link)}

                    </div>
                </div>
            </div>
        </div >
    );
}
