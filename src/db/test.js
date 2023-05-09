const { getData } = require('../utils.js')
const { isDaily, insert, findBy, update } = require('./setup.js')
const { QUOTES_API_URL } = require('../../config.json')


update("artndev#8888123")
    .then((data) => console.log(data))

//(QUOTES_API_URL).then((data) => { console.log(data.length) })
    
