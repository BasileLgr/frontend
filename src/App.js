import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [clips, setClips] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = 'https://backend-3s7r.onrender.com/clips';
        console.log('URL utilisée pour la requête:', apiUrl);

        axios
            .get(apiUrl)
            .then((response) => {
                console.log('Réponse reçue:', response.data);
                setClips(response.data.data);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des clips:', err);
                setError('Impossible de récupérer les clips pour le moment.');
            });
    }, []);


    return (
      <div>
        <h1>Clips Twitch</h1>
        {error ? (
            <p style={{ color: 'red' }}>{error}</p>
        ) : (
            <div>
              {clips.map((clip) => (
                  <div key={clip.id} style={{ marginBottom: '20px' }}>
                    <h3>{clip.title}</h3>
                    <iframe
                        src={clip.embed_url}
                        frameBorder="0"
                        allowFullScreen
                        title={clip.id}
                        width="640"
                        height="360"
                    ></iframe>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}

export default App;
