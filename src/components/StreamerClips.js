import React, { useState, useEffect } from 'react'; // Importer les hooks nécessaires
import axios from 'axios';

function StreamerClips({ username }) {
    const [clips, setClips] = useState([]);
    const [error, setError] = useState(null);
    const [gameName, setGameName] = useState('');
    const [duration, setDuration] = useState('7J');
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadClips = async () => {
        setLoading(true);
        try {
            const apiUrl = `https://backend-3s7r.onrender.com/clips?username=${username}&gameName=${gameName}&duration=${duration}&limit=12&cursor=${cursor}`;
            const response = await axios.get(apiUrl);
            setClips((prev) => [...prev, ...response.data.data]);
            setCursor(response.data.pagination?.cursor || null);
        } catch {
            setError('Impossible de récupérer les clips pour le moment.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setClips([]);
        setCursor(null);
        loadClips();
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
        downloadButton: {
            marginTop: '10px',
            padding: '8px 12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
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
                            <button
                                style={styles.downloadButton}
                                onClick={() => downloadClip(clip)}
                            >
                                Télécharger
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cursor && !loading && (
                <button onClick={loadClips} style={styles.downloadButton}>
                    Charger plus
                </button>
            )}
            {loading && <p>Chargement...</p>}
        </div>
    );
}

const downloadClip = (clip) => {
    const downloadUrl = clip.video_url; // Utilise l'URL vidéo corrigée du backend
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = `${clip.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};


export default StreamerClips;
