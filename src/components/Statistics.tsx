import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SongStatistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { _id: string; count: number }[];
  songsAndAlbumsByArtist: { artist: string; songs: number; albums: number }[];
  songsByAlbum: { _id: string; count: number }[];
}

const Statistics: React.FC = () => {
  const [stats, setStats] = useState<SongStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get<SongStatistics>('/api/songs/statistics');
        setStats(response.data);
      } catch (err) {
        setError('Failed to fetch statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div className="container  mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Song Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Songs</h2>
          <p className="text-3xl font-bold">{stats!.totalSongs}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Artists</h2>
          <p className="text-3xl font-bold">{stats!.totalArtists}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Albums</h2>
          <p className="text-3xl font-bold">{stats!.totalAlbums}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Genres</h2>
          <p className="text-3xl font-bold">{stats!.totalGenres}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Songs by Genre</h2>
          <ul className="list-disc pl-5">
            {stats!.songsByGenre.map((item) => (
              <li key={item._id}>
                {item._id}: {item.count}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Songs & Albums by Artist</h2>
          <ul className="list-disc pl-5">
            {stats!.songsAndAlbumsByArtist.map((item) => (
              <li key={item.artist}>
                {item.artist}: {item.songs} songs, {item.albums} albums
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Songs by Album</h2>
          <ul className="list-disc pl-5">
            {stats!.songsByAlbum.map((item) => (
              <li key={item._id}>
                {item._id}: {item.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
