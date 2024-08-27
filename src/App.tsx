import React from 'react';
import logo from './logo.svg';
import './App.css';
import Song from './components/SongList';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import SongList from './components/SongList';
import CreateSong from './components/CreateSong';
import Statistics from './components/Statistics';
import NavBar from './components/NavBar';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SongList />} />
          <Route path="/create" element={<CreateSong />} />
          <Route path="/edit/:id" element={<CreateSong />} />
          <Route path="/songs/statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
