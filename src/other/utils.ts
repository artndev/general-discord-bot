const { QUOTES_API_URL } = require('../../config.json')


module.exports = {
    getData: async (url: string): Promise<any> => {
        try {
            const response = await fetch(url);

            if (response.ok) { 
                return await response.json(); 
            }
        } 
        catch (err) { 
            if (err instanceof Error) {
                console.error(err)
            }
        }
    },
    dateToHours: (date: Date): number => { 
        return Math.floor(date.getTime() / 3.6e+6) 
    },
    getRandomArbitrary: (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    fetchDigits: async (str: string): Promise<number> => {
        return parseInt([...(await str.matchAll(/\d/g))].join(""))
    },
    getQuote: async (): Promise<{author: string, text: string}> => {
        let q = await module.exports.getData(QUOTES_API_URL)
        q = q[module.exports.getRandomArbitrary(0, q.length - 1)]
        
        return {
            author: !q["author"] ? "Unknown Author" : q["author"],
            text: q["text"]
        }
    },
    getQuotes: async (amount: number): Promise<{name: string, value: string}[]> => {
        const data = await module.exports.getData(QUOTES_API_URL)
        const from = module.exports.getRandomArbitrary(0, data.length - amount - 1)

        let res: {name: string, value: string}[] = []
        data.slice(from, from + amount)
            .map((q: {author: any, text: string}) => {
                return { 
                    author: !q["author"] ? "Unknown Author" : q["author"], 
                    text: q["text"] 
                }
            })
            .reverse()
            .forEach((q: {author: string, text: string}, i: number) => {
                res.push({
                    name: `**${(i + 1).toString()}. ${q["author"]}:**`,
                    value: `${q["text"]}`
                })            
            });
        return res
    },
}
