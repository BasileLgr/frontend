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
        container: {
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '20px',
        },
    };

    return (
        <Router>
            <div>
                <nav style={styles.navbar}>
                    <Link to="/" style={styles.link}>Accueil</Link>
                    <Link to="/qassim/gmod" style={styles.link}>Qassim - GMod</Link>
                    <Link to="/qassim/discussions" style={styles.link}>Qassim - Discussions</Link>
                    <Link to="/tayoh/gmod" style={styles.link}>Tayoh - GMod</Link>
                    <Link to="/tayoh/discussions" style={styles.link}>Tayoh - Discussions</Link>
                    <Link to="/hakai/gmod" style={styles.link}>Hakai - GMod</Link>
                    <Link to="/hakai/discussions" style={styles.link}>Hakai - Discussions</Link>
                    <Link to="/kameto/gmod" style={styles.link}>Kameto - GMod</Link>
                    <Link to="/kameto/discussions" style={styles.link}>Kameto - Discussions</Link>
                </nav>
                <div style={styles.container}>
                    <Routes>
                        <Route path="/" element={<h1>Bienvenue sur Twitch Clips Viewer</h1>} />
                        <Route path="/qassim/gmod" element={<StreamerClips username="qassimiento" gameName="Garry's Mod" />} />
                        <Route path="/qassim/discussions" element={<StreamerClips username="qassimiento" gameName="Just Chatting" />} />
                        <Route path="/tayoh/gmod" element={<StreamerClips username="tayoh_" gameName="Garry's Mod" />} />
                        <Route path="/tayoh/discussions" element={<StreamerClips username="tayoh_" gameName="Just Chatting" />} />
                        <Route path="/hakai/gmod" element={<StreamerClips username="hakaiwrld" gameName="Garry's Mod" />} />
                        <Route path="/hakai/discussions" element={<StreamerClips username="hakaiwrld" gameName="Just Chatting" />} />
                        <Route path="/kameto/gmod" element={<StreamerClips username="kamet0" gameName="Garry's Mod" />} />
                        <Route path="/kameto/discussions" element={<StreamerClips username="kamet0" gameName="Just Chatting" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
