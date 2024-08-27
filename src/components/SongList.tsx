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
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [newSong, setNewSong] = useState<Song>({ title: '', artist: '', album: '', genre: '' });

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

    const handleAddSong = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/api/songs', newSong);
            setAlertMessage('Song added successfully!');
            setAlertType('success');
            setNewSong({ title: '', artist: '', album: '', genre: '' });
            setShowAddForm(false);
            fetchSongs();
        } catch (error) {
            setAlertMessage('Error adding song.');
            setAlertType('error');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSong({ ...newSong, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Song List</h2>
            <span className="block">by Abdurhman Abrar</span>
            {alertMessage && (
                <div className={`mb-4 p-3 text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
                    {alertMessage}
                </div>
            )}

            <Link to="/create" className="mb-4 mr-2 inline-block px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700">
                Add New Song in new page
            </Link>
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mb-4 inline-block px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
            >
                {showAddForm ? 'Cancel' : 'Add New Song on the same page'}
            </button>
            {showAddForm && (
                <form onSubmit={handleAddSong} className="mb-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={newSong.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Artist</label>
                        <input
                            type="text"
                            name="artist"
                            value={newSong.artist}
                            onChange={handleInputChange}
                            placeholder="Artist"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Album</label>
                        <input
                            type="text"
                            name="album"
                            value={newSong.album}
                            onChange={handleInputChange}
                            placeholder="Album"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={newSong.genre}
                            onChange={handleInputChange}
                            placeholder="Genre"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
                    >
                        Add Song
                    </button>
                </form>
            )}
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
