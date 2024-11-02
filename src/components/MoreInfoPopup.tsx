"use client";
import { useState, useEffect, SetStateAction, use, JSXElementConstructor, ReactElement } from "react";

export async function getMovieDirectors(movieId: number) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key;
    const response = await fetch(request);
    const data = await response.json();
    if (!data.crew) return [];
    const directors = data.crew.filter((person: { job: string }) => person.job === "Director");
    return directors;
}
function getMovieCastAndCrew(movieId: number, setCast: any, setDirectors: any, setWriters: any) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key;
    fetch(request).then((req) => {
        req.json().then((data) => {
            const cast = data.cast.slice(0, 6);
            const directors = data.crew.filter((person: { job: string; }) => person.job === "Director");
            const writers = data.crew.filter((person: { job: string; }) => person.job === "Screenplay" || person.job === "Writer").slice(0, 4);

            setCast(cast);
            setDirectors(directors);
            setWriters(writers);
        });
    });
}

function getMovieTrailer(movieId: number, setTrailer: any) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=" + api_key;
    fetch(request).then((req) => {
        req.json().then((data) => {
            if (data.results.length === 0) {
                setTrailer(null);
                return;
            }
            let trailers = data.results.filter((trailer: { type: string; }) => trailer.type === "Trailer");
            if (trailers.length === 0) {
                trailers = data.results;
            }
            const index = Math.floor(Math.random() * trailers.length);
            const trailerId = trailers[index].key;

            const url = "https://www.youtube.com/embed/" + trailerId;

            setTrailer(url);
        });
    });
}

async function getRuntimeProductionCompanies(movieId: number, setRuntime: any, setProductionCompanyLogos: any, setGenres: any, setCountry: any, setWebsite: any, setReviews: any) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + api_key;

    const countryAbbrToName = new Map([
        ["US", "United States"],
        ["GB", "United Kingdom"],
        ["CA", "Canada"],
        ["AU", "Australia"],
        ["DE", "Germany"],
        ["FR", "France"],
        ["IT", "Italy"],
        ["JP", "Japan"],
        ["KR", "South Korea"],
        ["CN", "China"],
        ["RU", "Russia"],
        ["IN", "India"],
        ["BR", "Brazil"],
        ["MX", "Mexico"],
        ["ES", "Spain"],
        ["SE", "Sweden"],
        ["NL", "Netherlands"],
        ["DK", "Denmark"],
        ["NO", "Norway"],
        ["FI", "Finland"],
        ["BE", "Belgium"],
        ["IE", "Ireland"],
        ["CH", "Switzerland"],
        ["AT", "Austria"],
        ["PT", "Portugal"],
        ["PL", "Poland"],
        ["HU", "Hungary"],
        ["CZ", "Czech Republic"],
        ["GR", "Greece"],
        ["TR", "Turkey"],
        ["SG", "Singapore"],
        ["HK", "Hong Kong"],
        ["TH", "Thailand"],
        ["ID", "Indonesia"],
        ["PH", "Philippines"],
        ["AR", "Argentina"],
        ["CL", "Chile"],
        ["CO", "Colombia"],
        ["PE", "Peru"],
        ["ZA", "South Africa"],
        ["EG", "Egypt"]
    ]);

    setRuntime(null);
    setProductionCompanyLogos(null);
    setGenres(null);
    setCountry(null);
    setWebsite(null);
    fetch(request).then((req) => {
        req.json().then((data) => {
            const companies = data.production_companies;
            let runtime = data.runtime;
            //convert runtime to hours and minutes
            const hours = Math.floor(runtime / 60);
            const minutes = runtime % 60;
            runtime = hours + "h " + minutes + "m";
            setRuntime(runtime);

            let logos = companies.map((company: { logo_path: string }) => {
                if (company.logo_path === null) {
                    return null;
                }
                return "https://image.tmdb.org/t/p/original" + company.logo_path;
            });
            logos = logos.filter((logo: string) => logo !== null);
            logos = logos.slice(0, 5);
            setProductionCompanyLogos(logos);

            const genres = data.genres.map((genre: { name: string }) => genre.name);
            setGenres(genres);
            const countries: string[] = [];
            data.production_countries.forEach((country: { iso_3166_1: string; }) => {
                const countryName = countryAbbrToName.get(country.iso_3166_1);
                if (countryName) {
                    countries.push(countryName);
                }
            });
            setCountry(countries);
            if (data.homepage)
                setWebsite(data.homepage);

            setReviews({ score: data.vote_average, count: data.vote_count });
            // console.log(data);
        });
    });
}

function getStreamingAvailability(movieId: number, setStreamingAvailability: any, setBuyingAvailability: any, setLink: any) {
    const api_key = "1ea4c77bc924d2f26c117fbfdcfd6664";
    const request = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${api_key}`
    fetch(request).then((req) => {
        req.json().then((data) => {
            setStreamingAvailability(null);
            setBuyingAvailability(null);
            setLink(null);
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

function streamingWidget(streamingAvailability: any, rentingAvailability: any, link: string) {
    if (!streamingAvailability && !rentingAvailability) {
        return (<h2 className="m-auto hover:cursor-text">Not available to stream or rent</h2>);
    }
    let counter = 0;
    if (streamingAvailability?.length > 0) {
        return (
            <div className="grid grid-cols-1">
                {streamingAvailability?.length > 0 ? <h2 className="m-auto hover:cursor-text">Streaming Availability:</h2> : null}
                <div className={"grid gap-1 grid-cols-" + (streamingAvailability ? streamingAvailability.length : 1)}>
                    {streamingAvailability ? streamingAvailability.map((stream: { logo_path: string }) => {
                        return (<a key={counter++} href={link}><img className="m-auto h-[50px]" src={"https://image.tmdb.org/t/p/original" + stream.logo_path} /></a>);
                    }
                    ) : "Not available to stream"}
                </div>
            </div>);
    }
    return (
        <div className="grid grid-cols-1">
            {rentingAvailability?.length > 0 ? <h2 className="m-auto hover:cursor-text">Renting Availability:</h2> : null}
            <div className={"grid gap-1 grid-cols-4"}>
                {rentingAvailability ? rentingAvailability.map((buy: { logo_path: string }) => {
                    return (<a key={counter++} href={link}><img className="m-auto h-[50px]" src={"https://image.tmdb.org/t/p/original" + buy.logo_path} /></a>);
                }
                ) : "Not available to rent"}
            </div>
        </div >);

}

function castCrewWidget(cast: { name: string, id: number }[], directors: { name: string, id: number }[], writers: { name: string, id: number }[]) {
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

export function makeStars(score: number) {
    const star = <svg className="m-auto" width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.09 8.26L20.84 9.27L15.92 13.97L17.27 20.72L12 17.77L6.73 20.72L8.08 13.97L3.16 9.27L9.91 8.26L12 2Z"
            fill="yellow" />
    </svg>;
    const noStar = (<svg className="m-auto" width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.09 8.26L20.84 9.27L15.92 13.97L17.27 20.72L12 17.77L6.73 20.72L8.08 13.97L3.16 9.27L9.91 8.26L12 2Z"
            fill="black" />
    </svg>);
    //round score to nearest 0.1
    const numStars = Math.round((score + 1) / 2);
    const stars = [];
    //make stars which are filled up to numStars float
    for (let i = 0; i < numStars; i++) {
        stars.push(<div key={i}>{star}</div>);
    }
    for (let i = 0; i < 5 - numStars; i++) {
        stars.push(<div key={5 - i}>{noStar}</div>);
    }
    return (
        <div className="grid grid-cols-5 w-[100%] max-w-[200px] m-auto">
            {stars}
        </div>
    );
}

function ThreeColumnPopup(m: Movie, setSelectedMovie: any, website: any, reviews: any, cast: any, directors: any, writers: any, trailer: any, productionCompanyLogos: any, runtime: any, genres: any, countries: any, streamingAvailability: any, rentingAvailability: any, link: any) {
    let logoCounter = 0;
    return (
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] z-10 bg-[rgba(255,255,255,0.15)] hover:cursor-pointer" onClick={() => setSelectedMovie(null)}>
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-slate-500 z-20 rounded-[50px] p-10 hover:cursor-default" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-3 gap-5 h-[100%] overflow-auto">
                    <img className="m-auto h-[90%] object-contain" src={m.image} alt={m.name} />
                    <div className="grid grid-cols-1 gap-2" >
                        {website != null ?
                            <a href={website} className="m-auto text-xl hover:cursor-pointer">
                                <h1 className="m-auto text-xl  text-center"> {m.name + " (" + m.year + ")"} </h1>
                            </a> : <h1 className="m-auto text-xl hover:cursor-text text-center"> {m.name + " (" + m.year + ")"} </h1>
                        }
                        <div className="flex flex-col align-middle gap-0">
                            {makeStars(reviews?.score)}
                            <div className="m-auto">({reviews?.count})</div>
                        </div>
                        <h2 key="desc" className='m-auto hover:cursor-text text-center'> {m.description} </h2>
                        <h2 key="runtime" className="m-auto text-[20px] hover:cursor-text">{runtime}</h2>
                        <h2 key="genres" className="m-auto text-[20px] hover:cursor-text">
                            {//display genres with commas
                                genres ? genres.join(", ") : "Loading..."
                            }
                        </h2>
                        <h4 className="m-auto text-[15px] hover:cursor-text text-center">
                            {countries ? countries.join(", ") : "Loading..."}
                        </h4>
                        <div className={"grid max-h-[100px] gap-3 grid-cols-" + Math.min(productionCompanyLogos?.length ?? 0, 4)}>
                            {productionCompanyLogos ? productionCompanyLogos.map((logo: string) => {
                                return <img key={logoCounter++} className="m-auto max-h-[100px] " src={logo} />;
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

function TwoColumnPopup(m: Movie, setSelectedMovie: any, website: any, reviews: any, cast: any, directors: any, writers: any, trailer: any, productionCompanyLogos: any, runtime: any, genres: any, countries: any, streamingAvailability: any, rentingAvailability: any, link: any) {
    let logoCounter = 0;
    return (
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] z-10 bg-[rgba(255,255,255,0.15)] hover:cursor-pointer" onClick={() => setSelectedMovie(null)}>
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-slate-500 z-20 rounded-[50px] p-10 hover:cursor-default" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-2 gap-4 h-[100%] overflow-auto">
                    <div className="grid grid-cols-1 gap-1 max-h-[100%]" >
                        <img className="m-auto object-contain max-h-[500px]" src={m.image} alt={m.name} />

                        {website != null ?
                            <a href={website} className="m-auto text-xl hover:cursor-pointer">
                                <h1 className="m-auto text-xl  text-center"> {m.name + " (" + m.year + ")"} </h1>
                            </a> : <h1 className="m-auto text-xl hover:cursor-text text-center"> {m.name + " (" + m.year + ")"} </h1>
                        }
                        {makeStars(reviews?.score)}
                        <div className="m-auto">({reviews?.count})</div>
                        <h2 key="runtime" className="m-auto text-[20px] hover:cursor-text">{runtime}</h2>
                        <h2 key="genres" className="m-auto text-[20px] hover:cursor-text">
                            {//display genres with commas
                                genres ? genres.join(", ") : "Loading..."
                            }
                        </h2>
                        <h4 className="m-auto text-[15px] hover:cursor-text text-center">
                            {countries ? countries.join(", ") : "Loading..."}
                        </h4>
                        <div className={"grid max-h-[100px] gap-1 grid-cols-" + Math.min(productionCompanyLogos?.length ?? 0, 4)}>
                            {productionCompanyLogos ? productionCompanyLogos.map((logo: string) => {
                                return <img key={logoCounter++} className="m-auto max-h-[100px] " src={logo} />;
                            }
                            ) : "Loading..."}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1" >
                        <h2 key="desc" className='m-auto hover:cursor-text text-center'> {m.description} </h2>
                        {castCrewWidget(cast, directors, writers)}
                        {trailer && <iframe src={trailer} className="m-auto w-[100%] max-w-[500px] aspect-video" allowFullScreen />}
                        {streamingWidget(streamingAvailability, rentingAvailability, link)}
                    </div>

                </div>
            </div>
        </div>
    );
}

function OneColumnPopup(m: Movie, setSelectedMovie: any, website: any, reviews: any, cast: any, directors: any, writers: any, trailer: any, productionCompanyLogos: any, runtime: any, genres: any, countries: any, streamingAvailability: any, rentingAvailability: any, link: any) {
    let logoCounter = 0;
    return (
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] z-10 bg-[rgba(255,255,255,0.15)] hover:cursor-pointer" onClick={() => setSelectedMovie(null)}>
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-slate-500 z-20 rounded-[50px] p-10 hover:cursor-default" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-1 gap-4 h-[100%] overflow-auto">
                    <img className="m-auto h-[300px] object-contain" src={m.image} alt={m.name} />
                    {website != null ?
                        <a href={website} className="m-auto text-xl hover:cursor-pointer">
                            <h1 className="m-auto text-xl  text-center"> {m.name + " (" + m.year + ")"} </h1>
                        </a> : <h1 className="m-auto text-xl hover:cursor-text text-center"> {m.name + " (" + m.year + ")"} </h1>
                    }
                    {makeStars(reviews?.score)}
                    <div className="m-auto">({reviews?.count})</div>
                    <h2 key="runtime" className="m-auto text-[20px] hover:cursor-text">{runtime}</h2>
                    <h2 key="genres" className="m-auto text-[20px] hover:cursor-text">
                        {//display genres with commas
                            genres ? genres.join(", ") : "Loading..."
                        }
                    </h2>
                    <h4 className="m-auto text-[15px] hover:cursor-text text-center">
                        {countries ? countries.join(", ") : "Loading..."}
                    </h4>
                    <div className={"grid max-h-[100px] gap-1 grid-cols-" + Math.min(productionCompanyLogos?.length ?? 0, 4)}>
                        {productionCompanyLogos ? productionCompanyLogos.map((logo: string) => {
                            return <img key={logoCounter++} className="m-auto max-h-[100px] " src={logo} />;
                        }
                        ) : "Loading..."}
                    </div>
                    <h2 key="desc" className='m-auto hover:cursor-text text-center'> {m.description} </h2>
                    {castCrewWidget(cast, directors, writers)}
                    {trailer && <iframe src={trailer} className="m-auto w-[100%] max-w-[500px] aspect-video" allowFullScreen />}
                    {streamingWidget(streamingAvailability, rentingAvailability, link)}
                </div>

            </div>
        </div>
    );
}

export function MoreInfoPopup(m: Movie | null, setSelectedMovie: any) {
    const [cast, setCast] = useState<{ name: string, id: number }[]>([]);
    const [directors, setDirectors] = useState<{ name: string, id: number }[]>([]);
    const [writers, setWriters] = useState<{ name: string, id: number }[]>([]);
    const [trailer, setTrailer] = useState<string>("");
    const [productionCompanyLogos, setProductionCompanyLogos] = useState<string[]>([]);
    const [runtime, setRuntime] = useState(null);
    const [streamingAvailability, setStreamingAvailability] = useState(null);
    const [rentingAvailability, setRentingAvailability] = useState(null);
    const [link, setLink] = useState<string>("");
    const [genres, setGenres] = useState<string[] | null>(null);
    const [countries, setCountries] = useState<string[] | null>(null);
    const [website, setWebsite] = useState(null);
    const [reviews, setReviews] = useState<{ score: number, count: number }>({ score: 0, count: 0 });

    const [popupType, setPopupType] = useState<ReactElement<any, any>>(<div></div>);

    function updatePopup() {
        {
            if (m) {
                const width = window.innerWidth;
                if (width < 800)
                    setPopupType(OneColumnPopup(m, setSelectedMovie, website, reviews, cast, directors, writers, trailer, productionCompanyLogos, runtime, genres, countries, streamingAvailability, rentingAvailability, link));
                if (800 < width && width < 1500)
                    setPopupType(TwoColumnPopup(m, setSelectedMovie, website, reviews, cast, directors, writers, trailer, productionCompanyLogos, runtime, genres, countries, streamingAvailability, rentingAvailability, link));
                if (width > 1500)
                    setPopupType(ThreeColumnPopup(m, setSelectedMovie, website, reviews, cast, directors, writers, trailer, productionCompanyLogos, runtime, genres, countries, streamingAvailability, rentingAvailability, link));
            }
        }
    }

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updatePopup, 200);
    };
    useEffect(() => {
        if (!m) {
            setPopupType(<div></div>);
            window.removeEventListener("resize", handleResize);

        }
        else {
            getMovieCastAndCrew(m.id, setCast, setDirectors, setWriters);
            getMovieTrailer(m.id, setTrailer);
            getRuntimeProductionCompanies(m.id, setRuntime, setProductionCompanyLogos, setGenres, setCountries, setWebsite, setReviews);
            getStreamingAvailability(m.id, setStreamingAvailability, setRentingAvailability, setLink);
            updatePopup();
            window.addEventListener("resize", handleResize);
        }
        return () => {
            window.removeEventListener("resize", handleResize);

        };
    }, [m]);

    useEffect(() => {
        if (m)
            updatePopup();
    }, [cast, directors, writers, trailer, runtime, genres, countries, website, reviews, streamingAvailability, rentingAvailability, link]);

    return (
        <div>
            {popupType}
        </div>
    );


}
