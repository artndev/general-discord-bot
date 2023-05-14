const { QUOTES_API_URL } = require('../config.json')


module.exports = {
    getData: async (url) => {
        try {
            const response = await fetch(url);

            if (response.ok) { 
                return await response.json(); 
            }
        } 
        catch (err) { 
            throw err; 
        }
    },
    dateToHours: (date) => { 
        return Math.floor(new Date(date).getTime() / 3.6e+6) 
    },
    getRandomArbitrary: (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomQuote: async () => {
        const data = await module.exports.getData(QUOTES_API_URL)

        return data[module.exports.getRandomArbitrary(0, data.length - 1)]
    },
}
