require('dotenv').config();
const { API_VERSION } = process.env;
const nftRoute = require('./route/nft-route');
const path = require('path');
const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (req, res) => {
  res.sendStatus(200);
});

app.set('trust proxy', true);
app.set('json spaces', 2);

app.use(express.json());

// API routes
app.use('/api/' + API_VERSION, [nftRoute]);

// Page not found
app.use(function (req, res, next) {
  return res.status(404).json({ error: 'Not found' });;
});

// Error handling
app.use((err, req, res, next) => {
  const status = 500;
  console.error(err);
  res.status(status).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
