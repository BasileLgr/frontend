import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import StreamerClips from './components/StreamerClips';

function App() {
    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '#4CAF50',
            padding: '10px',
            color: 'white',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
    };

    return (
        <Router>
            <nav style={styles.navbar}>
                <Link to="/" style={styles.link}>Accueil</Link>
                <Link to="/qassim" style={styles.link}>Qassim</Link>
                <Link to="/tayoh" style={styles.link}>Tayoh</Link>
                <Link to="/hakai" style={styles.link}>Hakai</Link>
                <Link to="/kameto" style={styles.link}>Kameto</Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Bienvenue sur Goat Basile</h1>} />
                <Route path="/qassim" element={<StreamerClips username="qassimiento" />} />
                <Route path="/tayoh" element={<StreamerClips username="tayoh_" />} />
                <Route path="/hakai" element={<StreamerClips username="hakaiwrld" />} />
                <Route path="/kameto" element={<StreamerClips username="kamet0" />} />
            </Routes>
        </Router>
    );
}

export default App;
