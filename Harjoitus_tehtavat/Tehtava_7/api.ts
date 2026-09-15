const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;


export async function getExchangeRates() {
    const response = await fetch(API_URL!, {
        headers: {
            apikey: API_KEY!,
        },
    });

    const data = await response.json();

    return data.rates;
}