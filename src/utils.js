module.exports = {
    getData: async (url, headersContent = {}) => {
        try {
            const response = await fetch(
                url, 
                { headers: headersContent }
            );

            if (response.ok) { return await response.json(); }
        } 
        catch (error) { throw error; }
    },
    dateToHours: date => { return Math.floor(date.getTime() / 3.6e+6) },
}
