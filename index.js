const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Pour lire les données JSON
app.use(express.json());

// Route pour recevoir tes données GPS
app.post('/gps', (req, res) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⏰ Reçu à:', new Date().toISOString());
  console.log('📍 Données GPS:', req.body);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  res.json({ 
    status: 'success', 
    message: 'Données GPS reçues!',
    received: req.body 
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
