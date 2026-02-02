import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Settings } from 'lucide-react';

const Profile = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className="bg-[#141414] min-h-screen text-white">
            <Navbar />

            <div className="pt-28 px-4 md:px-12 max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Profile & Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded bg-gray-700 flex items-center justify-center">
                                <User className="w-8 h-8 text-gray-400" />
                            </div>
                            <div>
                                <div className="font-bold text-gray-300">{isAuthenticated ? user.name : 'Guest'}</div>
                                <div className="text-xs text-gray-500">{isAuthenticated ? user.email : 'Not Logged In'}</div>
                            </div>
                        </div>
                        <div className="bg-[#181818] p-4 rounded cursor-pointer hover:bg-[#282828] transition border-l-4 border-red-600 font-semibold text-white flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </div>
                    </div>

                    <div className="md:col-span-3 bg-[#181818] p-8 rounded">
                        <h2 className="text-2xl font-bold mb-6">Application Settings</h2>

                        {!isAuthenticated && (
                            <div className="bg-red-900/20 border border-red-900/50 p-4 rounded mb-8 text-red-200 text-sm">
                                You are currently using the application in Guest Mode. Please log in to enable all settings and save your preferences.
                            </div>
                        )}

                        <div className="space-y-8 text-gray-300">
                            <div className={`flex items-center justify-between ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <div>
                                    <div className="font-bold text-white text-lg">Dark Mode</div>
                                    <div className="text-xs text-gray-500">Adjust the appearance of the application</div>
                                </div>
                                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle" id="toggle1"
                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-400 border-4 appearance-none cursor-pointer checked:right-0 checked:bg-green-500"
                                        disabled={!isAuthenticated} defaultChecked />
                                    <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                                </div>
                            </div>

                            <div className={`flex items-center justify-between ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <div>
                                    <div className="font-bold text-white text-lg">Parental Lock</div>
                                    <div className="text-xs text-gray-500">Restrict content based on maturity ratings</div>
                                </div>
                                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle" id="toggle2"
                                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-400 border-4 appearance-none cursor-pointer"
                                        disabled={!isAuthenticated} />
                                    <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row gap-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={logout}
                                    className="block text-center w-full md:w-auto px-8 bg-red-600 text-white py-2 hover:bg-red-700 transition font-bold tracking-wide rounded"
                                >
                                    LOG OUT
                                </button>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="block text-center w-full md:w-auto px-8 bg-white text-black py-2 hover:bg-gray-200 transition font-bold tracking-wide"
                                >
                                    LOG IN
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
