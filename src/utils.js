module.exports = {
    getData: async (url) => {
        try {
            const response = await fetch(url);

            if (response.ok) { 
                return await response.json(); 
            }
        } 
        catch (error) { 
            throw error; 
        }
    },
    dateToHours: date => { 
        return Math.floor(date.getTime() / 3.6e+6) 
    },
    getRandomArbitrary: (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
