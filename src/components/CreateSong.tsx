import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Song {
    _id?: string;
    title: string;
    artist: string;
    album?: string;
    genre?: string;
}

const CreateSong = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [song, setSong] = useState<Song>({
        title: '',
        artist: '',
        album: '',
        genre: ''
    });
    const [editMode, setEditMode] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (id) {
            fetchSong(id);
        }
    }, [id]);

    const fetchSong = async (songId: string) => {
        try {
            const response = await axios.get<Song>(`/api/songs/${songId}`);
            setSong(response.data);
            setEditMode(true);
        } catch (error) {
            console.error("Error fetching song:", error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSong({ ...song, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(`/api/songs/${id}`, song);
                setAlertMessage('Song updated successfully!');
                setAlertType('success');
            } else {
                await axios.post('/api/songs', song);
                setAlertMessage('Song added successfully!');
                setAlertType('success');
            }
        } catch (error) {
            setAlertMessage('Error saving song.');
            setAlertType('error');
        }
        setSong({ title: '', artist: '', album: '', genre: '' });
        setEditMode(false);
        navigate('/');
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Song' : 'Add Song'}</h2>
            {alertMessage && (
                <div className={`mb-4 p-3 text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
                    {alertMessage}
                </div>
            )}
            <div className="flex justify-end">
                <a
                    href='/'
                    type="submit"
                    className=" mt-2 py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Back to Songs
                </a>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={song.title}
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
                        value={song.artist}
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
                        value={song.album}
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
                        value={song.genre}
                        onChange={handleInputChange}
                        placeholder="Genre"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {editMode ? 'Update' : 'Add'} Song
                </button>
            </form>
        </div>
    );
};

export default CreateSong;
