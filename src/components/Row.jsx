import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../services/tmdb';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, fetchUrl, isLargeRow, onMovieClick }) => {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null);

    useEffect(() => {
        async function loadData() {
            const data = await fetchData(fetchUrl);
            setMovies(data);
        }
        loadData();
    }, [fetchUrl]);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (movies.length === 0) return null;

    return (
        <div className="mb-8 relative group/row">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 pl-4 md:pl-12">{title}</h2>

            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 bg-black/50 cursor-pointer flex items-center justify-center hover:bg-black/70 opacity-0 group-hover/row:opacity-100 transition-opacity"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll no-scrollbar py-4 px-4 md:px-12 space-x-2 scroll-smooth"
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isLargeRow={isLargeRow}
                            onClick={onMovieClick}
                        />
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 bg-black/50 cursor-pointer flex items-center justify-center hover:bg-black/70 opacity-0 group-hover/row:opacity-100 transition-opacity"
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </button>
            </div>
        </div>
    );
};

export default Row;
