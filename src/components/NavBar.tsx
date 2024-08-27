import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-semibold">
                    <Link to="/">Song Manager</Link>
                </div>
                <div className="space-x-4">
                    <Link
                        to="/songs/statistics"
                        className="text-gray-300 hover:text-white"
                    >
                        Song Dashboard/Stats
                    </Link>
                    <Link
                        to="/"
                        className="text-gray-300 hover:text-white"
                    >
                        Song List
                    </Link>
                    <Link
                        to="/create"
                        className="text-gray-300 hover:text-white"
                    >
                        Add Song
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
