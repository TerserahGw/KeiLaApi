import express from 'express';
import { yt } from './scrape/y2mate.js';
import { tiktok } from './scrape/tiktok.js';
import { pixiv } from './scrape/pixiv.js';
import { play } from './scrape/play.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './' });
});

app.get('/yt', async (req, res) => {
  const youtubeUrl = req.query.q;

  if (!youtubeUrl) {
    return res.status(400).json({ error: 'Invalid or missing YouTube URL' });
  }

  try {
    const result = await yt(youtubeUrl);
    const formattedResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.end(formattedResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/play', async (req, res) => {
  const queryYt = req.query.q;

  if (!queryYt) {
    return res.status(400).json({ error: 'Invalid or missing query' });
  }

  try {
    const result = await play(queryYt);
    const formattedResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.end(formattedResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/tiktok', async (req, res) => {
  const tiktokUrl = req.query.q;

  if (!tiktokUrl) {
    return res.status(400).json({ error: 'Invalid or missing TikTok URL' });
  }

  try {
    const result = await tiktok(tiktokUrl);
    const formattedResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.end(formattedResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/pixiv', async (req, res) => {
  const pixivQuery = req.query.q;

  if (!pixivQuery) {
    return res.status(400).json({ error: 'Invalid or Missing Query' });
  }

  try {
    const result = await pixiv(pixivQuery);
    const formattedResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.end(formattedResult);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
