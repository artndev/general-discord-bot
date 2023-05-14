const { QUOTES_API_URL } = require('../config.json')


module.exports = {
    getData: async (url) => {
        try {
            const response = await fetch(url);

            if (response.ok) { 
                return (await response.json()); 
            }
        } 
        catch (err) { console.log(err) }
    },
    dateToHours: (date) => { 
        return Math.floor(new Date(date).getTime() / 3.6e+6) 
    },
    getRandomArbitrary: (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    getQuote: async () => {
        const data = await module.exports.getData(QUOTES_API_URL)
        const from = module.exports.getRandomArbitrary(0, data.length - 1)

        return data[from]
    },
    getQuotes: async (amount) => {
        const data = await module.exports.getData(QUOTES_API_URL)
        const from = module.exports.getRandomArbitrary(0, data.length - amount - 1)
        const parsedData = data.slice(from, from + amount)
        
        let res = ""
        parsedData.forEach(q => {
            Object.keys(q)
                .filter(k => { return q[k] })
                .reverse()
                .forEach(k => {
                    res += `**${k.charAt(0).toUpperCase() + k.slice(1)}:**\n${q[k]}\n`
                })
            res += "\n"
        });
        return res
    }
}
