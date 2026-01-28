import React, { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'TV Shows', path: '/tv' },
        { name: 'Movies', path: '/movies' },
        { name: 'New & Popular', path: '/latest' },
        { name: 'My List', path: '/mylist' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
            <div className="flex items-center gap-8">
                <NavLink to="/">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        className="w-24 md:w-32 cursor-pointer"
                        alt="Netflix"
                    />
                </NavLink>
                <ul className="hidden lg:flex items-center gap-6 text-sm">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `transition duration-300 hover:text-gray-300 ${isActive ? 'text-white font-bold' : 'text-gray-200'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-white">
                <form onSubmit={handleSearch} className="flex items-center gap-2 border border-transparent focus-within:border-white bg-transparent p-1 transition-all duration-300 group overflow-hidden">
                    <button type="submit" className="hover:text-gray-300 transition shrink-0">
                        <Search className="h-6 w-6" />
                    </button>
                    <input
                        type="text"
                        placeholder="Titles, people, genres"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-white text-sm w-0 group-focus-within:w-48 md:group-focus-within:w-64 transition-all duration-300 placeholder:text-gray-500 opacity-0 group-focus-within:opacity-100"
                    />
                </form>

                <button className="hover:text-gray-300 transition">
                    <Bell className="h-6 w-6" />
                </button>

                {isAuthenticated ? (
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <span className="text-white hidden md:block">{user?.name || 'User'}</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className="w-8 h-8 rounded" alt="Profile" />
                        <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <div className="w-32 bg-black/90 border border-gray-700 rounded shadow-lg overflow-hidden">
                                <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white">Profile</button>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white">Sign Out</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-6">
                        <div className="hidden md:block hover:text-gray-300 transition cursor-pointer">Guest</div>
                        <NavLink to="/login" className="bg-[#E50914] text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-[#c11119] transition">
                            Sign In
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
