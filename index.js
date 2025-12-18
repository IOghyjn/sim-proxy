// index.js – proxy HTTP → HTTPS pour SIM808
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Route pour les données JSON (battery, GPS, etc.)
app.post('/upload_data', async (req, res) => {
  console.log("📥 Reçu :", req.body);
  try {
    const response = await axios.post(
      'https://iot.pcs-agri.com/upload_data',
      req.body,
      { maxRedirects: 0 }
    );
    res.status(response.status).send("OK");
  } catch (err) {
    console.error("❌ Erreur proxy /upload_data :", err.message);
    res.status(500).send("Erreur proxy");
  }
});

// Route pour les chunks d’image
app.post('/upload_chunk', async (req, res) => {
  console.log("📥 Chunk reçu n°", req.body.chunkIndex);
  try {
    const response = await axios.post(
      'https://iot.pcs-agri.com/upload_chunk',
      req.body,
      { maxRedirects: 0 }
    );
    res.status(response.status).send("OK");
  } catch (err) {
    console.error("❌ Erreur proxy /upload_chunk :", err.message);
    res.status(500).send("Erreur chunk");
  }
});

// Écoute sur le PORT fourni par Railway (ou 8080 en local)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Proxy actif sur port ${PORT}`));
