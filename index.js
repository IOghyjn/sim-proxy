const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/upload_data', async (req, res) => {
  try {
    await axios.post('https://iot.pcs-agri.com/upload_data', req.body, { maxRedirects: 0 });
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/upload_chunk', async (req, res) => {
  try {
    await axios.post('https://iot.pcs-agri.com/upload_chunk', req.body, { maxRedirects: 0 });
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Proxy actif sur port ${PORT}`));
