import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            signup(name, email, password);
            navigate('/');
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-black">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')`
                }}
            />

            <header className="relative z-10 w-full px-4 md:px-12 py-6 flex justify-between items-center">
                <NavLink to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" className="w-24 md:w-36" alt="Netflix" />
                </NavLink>
                <NavLink to="/login" className="text-white font-bold hover:underline">Sign In</NavLink>
            </header>

            <div className="relative z-10 flex-grow flex items-center justify-center px-4">
                <div className="bg-black/75 p-8 md:p-16 rounded-lg w-full max-w-[450px] space-y-8">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-[#e87c03] text-white text-[14px] py-[10px] px-[20px] rounded-[4px]">
                                Account cannot be created at the moment. Please try again later.
                            </div>
                        )}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#333] rounded px-5 py-4 outline-none focus:bg-[#454545] transition text-white placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#333] rounded px-5 py-4 outline-none focus:bg-[#454545] transition text-white placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Add a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#333] rounded px-5 py-4 outline-none focus:bg-[#454545] transition text-white placeholder-gray-500"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#E50914] text-white font-bold py-4 rounded hover:bg-[#c11119] transition mt-4">
                            Sign Up
                        </button>
                    </form>

                    <div className="text-[#737373] mt-16 space-y-4">
                        <div className="text-base text-gray-500">
                            Already have an account? <NavLink to="/login" className="text-white hover:underline">Sign in now.</NavLink>
                        </div>
                        <div className="text-xs text-[#8c8c8c] leading-tight">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="relative z-10 bg-black/75 w-full py-8 mt-auto border-t border-gray-800">
                <div className="max-w-[1000px] mx-auto px-4 md:px-12 text-[#737373] text-sm">
                    <div className="mb-4">contact@example.com</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a href="#" className="hover:underline">FAQ</a>
                        <a href="#" className="hover:underline">Help Center</a>
                        <a href="#" className="hover:underline">Terms of Use</a>
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Cookie Preferences</a>
                        <a href="#" className="hover:underline">Corporate Information</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Signup;
