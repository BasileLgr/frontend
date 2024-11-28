import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StreamerClips({ username, gameName }) {
    const [clips, setClips] = useState([]);
    const [error, setError] = useState(null);
    const [duration, setDuration] = useState('7J'); // Durée par défaut

    useEffect(() => {
        const apiUrl = `https://backend-3s7r.onrender.com/clips?username=${username}&gameName=${encodeURIComponent(gameName)}&duration=${duration}`;
        axios
            .get(apiUrl)
            .then((response) => setClips(response.data.data))
            .catch(() => setError('Impossible de récupérer les clips pour le moment.'));
    }, [username, gameName, duration]);

    const downloadClip = (clipUrl, title) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = clipUrl;
        downloadLink.download = `${title}.mp4`;
        downloadLink.click();
    };

    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
        },
        clipCard: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        clipTitle: {
            fontSize: '16px',
            marginBottom: '10px',
        },
        iframe: {
            borderRadius: '10px',
            width: '100%',
            height: '200px',
            marginBottom: '10px',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <h2>Clips de {username} sur {gameName}</h2>
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="24h">24 heures</option>
                <option value="7J">7 jours</option>
                <option value="30J">30 jours</option>
                <option value="All">Tous</option>
            </select>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div style={styles.container}>
                    {clips.map((clip) => (
                        <div key={clip.id} style={styles.clipCard}>
                            <h3 style={styles.clipTitle}>{clip.title}</h3>
                            <iframe
                                src={clip.embed_url}
                                frameBorder="0"
                                allowFullScreen
                                title={clip.id}
                                style={styles.iframe}
                            ></iframe>
                            <button
                                style={styles.button}
                                onClick={() => downloadClip(clip.thumbnail_url.replace('-preview-480x272.jpg', '.mp4'), clip.title)}
                            >
                                Télécharger
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StreamerClips;
