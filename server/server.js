const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = 3001;
const COMICVINE_BASE_URL = 'https://comicvine.gamespot.com/api/';

app.get('/comicvine/*path', async (req, res) => {
    try {
        let path = Array.isArray(req.params.path) ? req.params.path.join('/') : req.params.path;
        if (!path.endsWith('/')) {
            path += '/';
        }

        const urlToFetch = `${COMICVINE_BASE_URL}${path}`;

        const response = await axios.get(urlToFetch, {
            params: {
                api_key: '29b993419bae03316c9dfbdce35be9f07da6bcb4',
                format: 'json',
                ...req.query
            },
            headers: { 'User-Agent': 'MyMarvelApp/1.0' }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Ошибка API:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
