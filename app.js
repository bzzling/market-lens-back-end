import https from 'https';
import express from 'express';
import dotenv from 'dotenv';
import { twelveDataAPI, rapidStocksAPI, polygonAPI, newsAPI, searchAPI } from './services/apiServices.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://marketlens.brandonling.me'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.get('/api/twelve/price/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const data = await twelveDataAPI.getStockPrice(symbol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch TwelveData price data' });
    }
});

app.get('/api/twelve/quote/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const data = await twelveDataAPI.getQuote(symbol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch TwelveData quote data' });
    }
});

// RapidAPI Real Stonks endpoint
app.get('/api/rapid/price/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const data = await rapidStocksAPI.getRealtimePrice(symbol);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch RapidAPI price data' });
    }
});

app.get('/api/polygon/aggregates/:ticker/:startDate/:endDate', async (req, res) => {
    try {
        const { ticker, startDate, endDate } = req.params;
        const data = await polygonAPI.getAggregates(ticker, startDate, endDate);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/news/finance', async (req, res) => {
    try {
        const data = await newsAPI.getFinanceNews();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch finance news data' });
    }
});

app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        const data = await searchAPI.searchTicker(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

app.get('/api/*', (req, res) => {
    const apiKey = process.env.POLYGON_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    const path = req.params[0];
    const query = req.query;

    const queryString = new URLSearchParams({ ...query, apiKey }).toString();

    const options = {
        hostname: 'api.polygon.io',
        port: 443,
        path: `/${path}?${queryString}`,
        method: 'GET',
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.status(response.statusCode).send(data);
        });
    });

    request.on('error', (e) => {
        res.status(500).json({ error: e.message });
    });

    request.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

