import React from 'react';
import { IMG_BASE_URL } from '../services/tmdb';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

const MovieModal = ({ movie, isOpen, onClose }) => {
    if (!isOpen || !movie) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 md:p-8">
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-[#181818] rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-4xl w-full z-10 max-h-full overflow-y-auto no-scrollbar">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#181818] text-white flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="relative h-[40vh] md:h-[50vh]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${IMG_BASE_URL}${movie.backdrop_path || movie.poster_path})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-10 left-10 space-y-4 max-w-xl z-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                            {movie.title || movie.name}
                        </h2>
                        <div className="flex items-center gap-4">
                            <button className="bg-white text-black px-8 py-2 rounded font-bold hover:bg-opacity-90 transition flex items-center gap-2">
                                <Play className="w-5 h-5 fill-current" />
                                Play
                            </button>
                            <button className="border border-gray-400 text-white p-2 rounded-full hover:border-white transition flex items-center justify-center">
                                <Plus className="w-6 h-6" />
                            </button>
                            <button className="border border-gray-400 text-white p-2 rounded-full hover:border-white transition flex items-center justify-center">
                                <ThumbsUp className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-green-500 font-bold">{(movie.vote_average * 10).toFixed(0)}% Match</span>
                            <span className="text-gray-400">
                                {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}
                            </span>
                            <span className="border border-gray-500 px-1 text-xs text-gray-400">HD</span>
                        </div>
                        <p className="text-white text-base md:text-lg leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>
                    <div className="text-sm space-y-2">
                        <div><span className="text-gray-500">Cast:</span> <span className="text-white">Generic Cast, Actor Name</span></div>
                        <div><span className="text-gray-500">Genres:</span> <span className="text-white">Action, Exciting</span></div>
                        <div><span className="text-gray-500">This movie is:</span> <span className="text-white">Mind-bending</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
