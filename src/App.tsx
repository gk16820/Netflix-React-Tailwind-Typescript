import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import MovieModal from './components/MovieModal';
import { requests, Movie } from './services/tmdb';
import './App.css';

const Home: React.FC<{ onMovieClick: (movie: Movie) => void }> = ({ onMovieClick }) => (
    <>
        <Banner fetchUrl={requests.fetchTrending} onMovieClick={onMovieClick} />
        <main className="relative z-20 -mt-24 md:-mt-32 pb-10 space-y-2">
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow onMovieClick={onMovieClick} />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieClick={onMovieClick} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onMovieClick={onMovieClick} />
            <Row title="Action Thrillers" fetchUrl={requests.fetchActionMovies} onMovieClick={onMovieClick} />
            <Row title="Comedies" fetchUrl={requests.fetchComedyMovies} onMovieClick={onMovieClick} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onMovieClick={onMovieClick} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onMovieClick={onMovieClick} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onMovieClick={onMovieClick} />
        </main>
    </>
);

const TVShows: React.FC<{ onMovieClick: (movie: Movie) => void }> = ({ onMovieClick }) => (
    <>
        <Banner fetchUrl={requests.fetchNetflixOriginals} onMovieClick={onMovieClick} />
        <main className="relative z-20 -mt-24 md:-mt-32 pb-10">
            <Row title="Trending TV Shows" fetchUrl={requests.fetchTVTrending} isLargeRow onMovieClick={onMovieClick} />
            <Row title="TV Dramas" fetchUrl={requests.fetchTVDrama} onMovieClick={onMovieClick} />
            <Row title="Sitcoms" fetchUrl={requests.fetchTVComedy} onMovieClick={onMovieClick} />
            <Row title="Crime TV Shows" fetchUrl={requests.fetchTVCrime} onMovieClick={onMovieClick} />
            <Row title="Animation" fetchUrl={requests.fetchTVAnimation} onMovieClick={onMovieClick} />
        </main>
    </>
);

const Movies: React.FC<{ onMovieClick: (movie: Movie) => void }> = ({ onMovieClick }) => (
    <>
        <Banner fetchUrl={requests.fetchActionMovies} onMovieClick={onMovieClick} />
        <main className="relative z-20 -mt-24 md:-mt-32 pb-10">
            <Row title="Blockbuster Movies" fetchUrl={requests.fetchActionMovies} isLargeRow onMovieClick={onMovieClick} />
            <Row title="New Releases" fetchUrl={requests.fetchNowPlaying} onMovieClick={onMovieClick} />
            <Row title="Sci-Fi & Fantasy" fetchUrl={requests.fetchSciFi} onMovieClick={onMovieClick} />
            <Row title="Suspenseful Thrillers" fetchUrl={requests.fetchThriller} onMovieClick={onMovieClick} />
        </main>
    </>
);

const Latest: React.FC<{ onMovieClick: (movie: Movie) => void }> = ({ onMovieClick }) => (
    <>
        <Banner fetchUrl={requests.fetchUpcoming} onMovieClick={onMovieClick} />
        <main className="relative z-20 -mt-24 md:-mt-32 pb-10">
            <Row title="Coming Soon" fetchUrl={requests.fetchUpcoming} isLargeRow onMovieClick={onMovieClick} />
            <Row title="New on Netflix" fetchUrl={requests.fetchNowPlaying} onMovieClick={onMovieClick} />
            <Row title="Airing Today (TV)" fetchUrl={requests.fetchTVAiringToday} onMovieClick={onMovieClick} />
        </main>
    </>
);

const MyList: React.FC = () => (
    <main className="pt-24 min-h-screen">
        <div className="h-[60vh] flex flex-col items-center justify-center text-center text-gray-400 px-4">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h2 className="text-3xl text-white font-bold mb-2">Your List is Empty</h2>
            <p className="max-w-md">Films and TV shows that you add to your list will appear here.</p>
        </div>
    </main>
);

function App() {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    return (
        <Router>
            <div className="bg-[#141414] min-h-screen font-sans text-white antialiased overflow-x-hidden">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home onMovieClick={handleMovieClick} />} />
                    <Route path="/tv" element={<TVShows onMovieClick={handleMovieClick} />} />
                    <Route path="/movies" element={<Movies onMovieClick={handleMovieClick} />} />
                    <Route path="/latest" element={<Latest onMovieClick={handleMovieClick} />} />
                    <Route path="/mylist" element={<MyList />} />
                </Routes>

                <MovieModal
                    movie={selectedMovie}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                <footer className="max-w-[1000px] mx-auto text-gray-400 text-sm py-20 px-4 border-t border-gray-800 mt-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-4">
                        <ul className="space-y-2">
                            <li className="hover:underline cursor-pointer">Audio and Subtitles</li>
                            <li className="hover:underline cursor-pointer">Media Center</li>
                            <li className="hover:underline cursor-pointer">Privacy</li>
                            <li className="hover:underline cursor-pointer">Contact Us</li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="hover:underline cursor-pointer">Audio Description</li>
                            <li className="hover:underline cursor-pointer">Investor Relations</li>
                            <li className="hover:underline cursor-pointer">Legal Notices</li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="hover:underline cursor-pointer">Help Center</li>
                            <li className="hover:underline cursor-pointer">Jobs</li>
                            <li className="hover:underline cursor-pointer">Cookie Preferences</li>
                        </ul>
                        <ul className="space-y-2">
                            <li className="hover:underline cursor-pointer">Gift Cards</li>
                            <li className="hover:underline cursor-pointer">Terms of Use</li>
                            <li className="hover:underline cursor-pointer">Corporate Information</li>
                        </ul>
                    </div>
                    <div className="text-[11px]">&copy; 2026 Netflix Clone TypeScript.</div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
