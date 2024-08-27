import React from 'react';
import logo from './logo.svg';
import './App.css';
import Song from './components/SongList';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import SongList from './components/SongList';
import CreateSong from './components/CreateSong';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/create" element={<CreateSong />} />
        <Route path="/edit/:id" element={<CreateSong />} />
      </Routes>
    </Router>
  );
};

export default App;
