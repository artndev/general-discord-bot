const { QUOTES_API_URL } = require('../config.json')


module.exports = {
    getData: async (url) => {
        try {
            const response = await fetch(url);

            if (response.ok) { 
                return await response.json(); 
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
    fetchDigits: async (str) => {
        return parseInt([...(await str.matchAll(/\d/g))].join(""))
    },
    getQuote: async () => {
        const data = await module.exports.getData(QUOTES_API_URL)
        const from = module.exports.getRandomArbitrary(0, data.length - 1)

        return data[from]
    },
    getQuotes: async (amount) => {
        const data = await module.exports.getData(QUOTES_API_URL)
        const from = module.exports.getRandomArbitrary(0, data.length - amount - 1)
        
        let res = []
        data.slice(from, from + amount)
            .map(q => {
                return { 
                    author: !q["author"] ? "Unknown Author" : q["author"], 
                    text: q["text"] 
                }
            })
            .reverse()
            .forEach((q, i) => {
                res.push({
                    name: `**${(i + 1).toString()}. ${q["author"]}:**`,
                    value: `${q["text"]}`
                })            
            });
        return res
    },
}
