import React, { useState, useEffect } from 'react';
import { Movie, fetchData, IMG_BASE_URL } from '../services/tmdb';
import { Play, Info } from 'lucide-react';

interface BannerProps {
    fetchUrl: string;
    onMovieClick: (movie: Movie) => void;
}

const Banner: React.FC<BannerProps> = ({ fetchUrl, onMovieClick }) => {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        async function loadData() {
            const data = await fetchData(fetchUrl);
            if (data.length > 0) {
                setMovie(data[Math.floor(Math.random() * data.length)]);
            }
        }
        loadData();
    }, [fetchUrl]);

    if (!movie) return <div className="h-[56.25vw] min-h-[85vh] bg-[#141414]" />;

    return (
        <header
            className="relative h-[56.25vw] min-h-[85vh] w-full text-white object-cover bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG_BASE_URL}${movie.backdrop_path || movie.poster_path})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

            <div className="absolute top-[30%] md:top-[25%] left-4 md:left-12 max-w-xl space-y-4 z-10 transition-transform duration-700">
                <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                    <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg pb-4">
                        {movie.title || movie.name || movie.original_name}
                    </h1>
                    <p className="text-white text-base md:text-lg font-medium drop-shadow-md line-clamp-3 max-w-lg md:max-w-xl">
                        {movie.overview}
                    </p>
                </div>

                <div className="flex items-center gap-3 pt-4">
                    <button
                        onClick={() => onMovieClick(movie)}
                        className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-opacity-80 transition flex items-center gap-2 font-bold text-lg"
                    >
                        <Play className="w-6 h-6 fill-current" />
                        Play
                    </button>
                    <button
                        onClick={() => onMovieClick(movie)}
                        className="bg-[rgba(109,109,110,0.7)] text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition flex items-center gap-2 font-bold text-lg backdrop-blur-sm"
                    >
                        <Info className="w-6 h-6" />
                        More Info
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Banner;
