const express = require('express');
const { yt } = require('./scrape/y2mate.js');
//const { tiktok } = require('./scrape/tiktok.js');
const { pixiv } = require('./scrape/pixiv.js');
//const { play } = require('./scrape/play.js');
const timeout = require('connect-timeout');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(timeout('1m'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './' });
});

app.get('/ytdl', async (req, res) => {
  const youtubeUrl = req.query.q;

  if (!youtubeUrl) {
    return res.status(400).json({ error: 'Invalid or missing YouTube URL' });
  }

  try {
    const result = await yt(youtubeUrl);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(result, null, 2));
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*app.get('/play', async (req, res) => {
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
});*/

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

app.use((err, req, res, next) => {
  if (err.code === 'ETIMEDOUT') {
    res.status(503).json({ error: 'Request Timeout' });
  } else {
    next(err);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.timeout = 60000;
