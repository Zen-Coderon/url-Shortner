const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { nanoid } = require('nanoid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Url = require('./models/Url');

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
  const { longUrl, customCode } = req.body;

  const code = customCode || nanoid(6);
  const base = process.env.BASE_URL;

  const existing = await Url.findOne({ shortCode: code });
  if (existing) return res.status(400).json({ error: 'Custom code already in use.' });

  const shortUrl = `${base}/${code}`;

  const newUrl = new Url({ longUrl, shortCode: code, shortUrl });
  await newUrl.save();

  res.json({ shortUrl });
});

// GET /:code
app.get('/:code', async (req, res) => {
  const code = req.params.code;
  const entry = await Url.findOne({ shortCode: code });
  if (entry) {
    res.redirect(entry.longUrl);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
