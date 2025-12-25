const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure ton proxy ici
app.use('/', createProxyMiddleware({
  target: 'https://ton-site-cible.com', // Change l'URL cible
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    console.log('Proxying request to:', proxyReq.path);
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
