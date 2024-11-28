import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StreamerClips({ username }) {
    const [clips, setClips] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = `https://backend-3s7r.onrender.com/clips?username=${username}`;
        console.log(`URL utilisée pour ${username}:`, apiUrl);

        axios
            .get(apiUrl)
            .then((response) => {
                console.log('Réponse reçue:', response.data);
                setClips(response.data.data);
            })
            .catch((err) => {
                console.error(`Erreur lors de la récupération des clips pour ${username}:`, err);
                setError('Impossible de récupérer les clips pour le moment.');
            });
    }, [username]);

    const downloadClip = (clipUrl, title) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = clipUrl;
        downloadLink.download = `${title}.mp4`;
        downloadLink.click();
    };

    const styles = {
        clipCard: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '20px',
            padding: '15px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        clipTitle: {
            fontSize: '18px',
            marginBottom: '10px',
            color: '#333',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            marginTop: '10px',
        },
        iframe: {
            borderRadius: '10px',
            marginBottom: '10px',
        },
    };

    return (
        <div>
            <h2>Clips de {username}</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    {clips.map((clip) => (
                        <div key={clip.id} style={styles.clipCard}>
                            <h3 style={styles.clipTitle}>{clip.title}</h3>
                            <iframe
                                src={clip.embed_url}
                                frameBorder="0"
                                allowFullScreen
                                title={clip.id}
                                width="100%"
                                height="360"
                                style={styles.iframe}
                            ></iframe>
                            <button
                                style={styles.button}
                                onClick={() => downloadClip(clip.thumbnail_url.replace('-preview-480x272.jpg', '.mp4'), clip.title)}
                            >
                                Télécharger le clip
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StreamerClips;
