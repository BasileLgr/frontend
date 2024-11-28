import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StreamerClips({ username }) {
    const [clips, setClips] = useState([]);
    const [error, setError] = useState(null);
    const [gameName, setGameName] = useState('');
    const [duration, setDuration] = useState('7J');

    useEffect(() => {
        const apiUrl = `https://backend-3s7r.onrender.com/clips?username=${username}&gameName=${gameName}&duration=${duration}`;
        axios
            .get(apiUrl)
            .then((response) => {
                setClips(response.data.data);
            })
            .catch((err) => {
                setError('Impossible de récupérer les clips pour le moment.');
            });
    }, [username, gameName, duration]);

    const styles = {
        clipGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
        },
        clipCard: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '10px',
            textAlign: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        iframe: {
            width: '100%',
            height: '200px',
        },
    };

    return (
        <div>
            <h2>Clips de {username}</h2>

            <div>
                <label>
                    Catégorie :
                    <select value={gameName} onChange={(e) => setGameName(e.target.value)}>
                        <option value="">Toutes</option>
                        <option value="Garry's Mod">Garry's Mod</option>
                        <option value="Just Chatting">Discussions</option>
                    </select>
                </label>

                <label>
                    Durée :
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                        <option value="24h">Dernières 24h</option>
                        <option value="7J">7 jours</option>
                        <option value="30J">30 jours</option>
                        <option value="All">Tout</option>
                    </select>
                </label>
            </div>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={styles.clipGrid}>
                    {clips.map((clip) => (
                        <div key={clip.id} style={styles.clipCard}>
                            <h3>{clip.title}</h3>
                            <iframe
                                src={clip.embed_url}
                                frameBorder="0"
                                allowFullScreen
                                title={clip.id}
                                style={styles.iframe}
                            ></iframe>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StreamerClips;
