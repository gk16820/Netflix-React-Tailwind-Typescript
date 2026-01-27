import React from 'react';
import { IMG_BASE_URL } from '../services/tmdb';

const MovieCard = ({ movie, isLargeRow, onClick }) => {
    const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path;

    if (!imagePath) return null;

    const heightClass = isLargeRow ? "h-64 md:h-[400px]" : "h-28 md:h-36";
    const widthClass = isLargeRow ? "min-w-[150px] md:min-w-[250px]" : "min-w-[180px] md:min-w-[240px]";

    return (
        <div
            className={`relative group cursor-pointer transition-transform duration-300 hover:scale-110 shrink-0 ${widthClass}`}
            onClick={() => onClick(movie)}
        >
            <img
                src={`${IMG_BASE_URL}${imagePath}`}
                alt={movie.title || movie.name}
                className={`w-full ${heightClass} object-cover rounded shadow-lg`}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                <p className="text-white text-xs font-bold px-2 text-center line-clamp-2">
                    {movie.title || movie.name}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
