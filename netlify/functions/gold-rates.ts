import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Fetch gold rates from CoinGecko (free API, no key required)
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=aed,usd&include_24hr_change=true');

        if (!response.ok) {
            throw new Error('Failed to fetch gold rates');
        }

        const data = await response.json();

        // Transform to expected format
        const goldData = {
            price_gram_24k_aed: data.gold?.aed ? (data.gold.aed / 31.1035).toFixed(2) : '250.00',
            price_gram_24k_usd: data.gold?.usd ? (data.gold.usd / 31.1035).toFixed(2) : '68.00',
            change_24h: data.gold?.aed_24h_change || 0,
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(goldData),
        };
    } catch (error) {
        console.error('Gold rates error:', error);
        // Return fallback rates
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                price_gram_24k_aed: '250.00',
                price_gram_24k_usd: '68.00',
                change_24h: 0,
            }),
        };
    }
};

export { handler };
