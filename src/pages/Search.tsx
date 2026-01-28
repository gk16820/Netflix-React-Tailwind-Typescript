import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchData, requests } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Movie } from '../types/tmdb';

interface SearchProps {
    onMovieClick: (movie: Movie) => void;
}

const Search: React.FC<SearchProps> = ({ onMovieClick }) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getResults = async () => {
            if (!query) return;
            setLoading(true);
            const data = await fetchData(requests.fetchSearch(query));
            setResults(data || []);
            setLoading(false);
        };
        getResults();
    }, [query]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="pt-32 px-4 md:px-12 min-h-screen bg-[#141414]">
                    <h2 className="text-2xl font-bold mb-8">Searching for "{query}"...</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-video bg-gray-800 animate-pulse rounded-md" />
                        ))}
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="pt-32 px-4 md:px-12 min-h-screen bg-[#141414]">
                <h2 className="text-2xl font-bold mb-8 items-center flex gap-2">
                    <span className="text-gray-400 font-normal">Explore titles related to:</span>
                    <span>{query}</span>
                </h2>

                {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12">
                        {results.map((movie) => (
                            movie.poster_path || movie.backdrop_path ? (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onClick={onMovieClick}
                                />
                            ) : null
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p className="text-xl">Your search for "{query}" did not have any matches.</p>
                        <ul className="mt-4 list-disc list-inside text-sm">
                            <li>Try different keywords</li>
                            <li>Looking for a movie or TV show?</li>
                            <li>Try using a movie title or actor name</li>
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Search;
