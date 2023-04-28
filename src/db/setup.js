require("dotenv").config()
const { MongoClient } = require("mongodb");
const { dateToHours, getData } = require("../utils");
const { QRANDOM_API_URL } = require('../../config.json')

// !!!! СДЕЛАТЬ ОБНОВЛЕНИЕ ДАТЫ В БД ПОСЛЕ НАЖАТИИ НА КНОПКУ


const findByFunc = full_name => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(client => {
                const db = client.db("quotes_bot");

                db.collection("users").findOne({ 
                    full_name: full_name
                })
                    .then(data => resolve(data))
                    .catch(err => reject(err))
            })
            .catch(async (err) => {
                if (!(err instanceof TypeError))
                    throw err
           
                return await insertFunc(full_name)
            }) 
    })
}

const insertFunc = full_name => {
    return new Promise(async (resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(async (client) => {
                const dict = {
                    full_name: full_name,
                    date: new Date(),
                    daily_quote: await getData(QRANDOM_API_URL)
                }
                const db = client.db("quotes_bot");
                
                db.collection("users").insertOne(dict)
                    .then(() => resolve(dict))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err)) 
    })
}



const updateFunc = full_name => {
    return new Promise(async (resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(async (client) => {
                const isDaily = await isDailyFunc(full_name)
                const db = client.db("quotes_bot");

                db.collection("users").updateOne(
                    { full_name: full_name },
                    isDaily["result"]
                    ? { 
                        $set: {
                            daily_quote: await getData(QRANDOM_API_URL), 
                            date: new Date() 
                        } 
                    }
                    : {
                        $set: {
                            daily_quote: isDaily["data"]["daily_quote"],
                            date: isDaily["data"]["date"]
                        }
                    }

                )
                    .then(() => resolve(true))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err)) 
    })
}

const isDailyFunc = async (full_name) => {
    return findByFunc(full_name)
        .then(data => {
            return {
                ["result"]: 
                    (dateToHours(new Date()) - dateToHours(data.date)) >= 24,
                ["data"]: 
                    data,
            }
        }) 
}


module.exports = {
    findBy: findByFunc,
    insert: insertFunc,
    update: updateFunc,
}




