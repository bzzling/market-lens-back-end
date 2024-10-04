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

export {
    twelveDataAPI,
    rapidStocksAPI,
    polygonAPI
}; 