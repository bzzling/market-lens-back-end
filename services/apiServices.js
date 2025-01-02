import axios from 'axios';

const twelveDataAPI = {
    getStockPrice: async (symbol) => {
        try {
            const response = await axios.get(
                `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_API_KEY}`
            );
            return response.data;
        } catch (error) {
            console.error('TwelveData API Error:', error);
            throw error;
        }
    },
    
    getQuote: async (symbol) => {
        try {
            const response = await axios.get(
                `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.TWELVE_DATA_API_KEY}`
            );
            return response.data;
        } catch (error) {
            console.error('TwelveData API Error:', error);
            throw error;
        }
    }
};

const rapidStocksAPI = {
    getRealtimePrice: async (symbol) => {
        try {
            const response = await axios.get(
                `https://realstonks.p.rapidapi.com/stocks/${symbol}`,
                {
                    headers: {
                        'x-rapidapi-key': process.env.RAPID_API_KEY,
                        'x-rapidapi-host': 'realstonks.p.rapidapi.com'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('RapidAPI Stocks Error:', error);
            throw error;
        }
    }
};

const polygonAPI = {
    getAggregates: async (ticker, startDate, endDate) => {
        try {
            const response = await axios.get(
                `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}`,
                {
                    params: {
                        apiKey: process.env.POLYGON_API_KEY
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Polygon API Error:', error);
            throw error;
        }
    },
    // Add other Polygon endpoints as needed
};

const newsAPI = {
    getFinanceNews: async () => {
        try {
            const response = await axios.get(
                `https://newsdata.io/api/1/news`,
                {
                    params: {
                        apikey: process.env.NEWS_API_KEY,
                        q: 'stocks',
                        country: 'ca,us',
                        language: 'en'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('News API Error:', error);
            throw error;
        }
    }
};

const searchAPI = {
    searchTicker: async (query) => {
        try {
            const response = await axios.get(
                `https://financialmodelingprep.com/api/v3/search`,
                {
                    params: {
                        query: query,
                        apikey: process.env.SEARCH_API_KEY
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Search API Error:', error);
            throw error;
        }
    }
};

export {
    twelveDataAPI,
    rapidStocksAPI,
    polygonAPI,
    newsAPI,
    searchAPI
}; 