const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Pour parser le JSON
app.use(express.json());

// Endpoint pour recevoir les données GPS
app.post('/data', (req, res) => {
  const { latitude, longitude, battery, timestamp } = req.body;
  
  // LOG COMPLET des données reçues
  console.log('========== NOUVELLES DONNÉES ==========');
  console.log('Heure:', new Date().toISOString());
  console.log('GPS Latitude:', latitude);
  console.log('GPS Longitude:', longitude);
  console.log('Batterie:', battery + '%');
  console.log('Timestamp:', timestamp);
  console.log('Données complètes:', JSON.stringify(req.body, null, 2));
  console.log('=======================================');
  
  // Répond au client
  res.json({ 
    status: 'success', 
    message: 'Données reçues!',
    received: req.body 
  });
});

// Page pour voir les logs en temps réel (optionnel)
app.get('/', (req, res) => {
  res.send('<h1>Proxy GPS actif ✅</h1><p>Envoie POST à /data</p>');
});

app.listen(PORT, () => {
  console.log(`Proxy GPS running on port ${PORT}`);
});
