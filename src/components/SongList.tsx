import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Song {
    _id?: string;
    title: string;
    artist: string;
    album?: string;
    genre?: string;
}

const SongList = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await axios.get<Song[]>('/api/songs');
            setSongs(response.data);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/songs/${id}`);
            setAlertMessage('Song deleted successfully!');
            setAlertType('success');
            fetchSongs();
        } catch (error) {
            setAlertMessage('Error deleting song.');
            setAlertType('error');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Song List</h2>
            {alertMessage && (
                <div className={`mb-4 p-3 text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
                    {alertMessage}
                </div>
            )}
            <Link to="/create" className="mb-4 inline-block px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700">
                Add New Song
            </Link>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Album</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {songs.map((song) => (
                        <tr key={song._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{song.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.artist}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.album}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.genre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link to={`/edit/${song._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                <button
                                    onClick={() => handleDelete(song._id || '')}
                                    className="ml-4 text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SongList;
