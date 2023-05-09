require("dotenv").config()
const { MongoClient } = require("mongodb");
const { dateToHours, getData, getRandomArbitrary } = require("../utils");
const { QUOTES_API_URL } = require('../../config.json')


const findByFunc = (username) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then((client) => {
                const db = client.db("quotes_bot");

                db.collection("users").findOne({ 
                    username: username
                })
                    .then(async (data) => {
                        if (data === null) {
                            resolve(await insertFunc(username))
                        }

                        resolve(data)
                    })
                    .catch((err) => reject(err))
            })
            .catch((err) => {
                throw err
            }) 
    })
}

const insertFunc = (username) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(async (client) => {
                const db = client.db("quotes_bot");
                const q = new Promise((resolve, reject) => {
                    getData(QUOTES_API_URL)
                        .then((data) => {
                            resolve(data[getRandomArbitrary(0, data.length - 1)])
                        })
                        .catch((err) => reject(err))
                })
                const data = {
                    username: username,
                    daily_quote: await q,
                    date: new Date(),
                }
                
                db.collection("users").insertOne(data)
                    .then(() => resolve(data))
                    .catch((err) => reject(err))
            })
            .catch((err) => reject(err)) 
    })
}

const updateFunc = (username) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(async (client) => {
                const isDaily = await isDailyFunc(username)
                const db = client.db("quotes_bot");
                const q = new Promise((resolve, reject) => {
                    getData(QUOTES_API_URL)
                        .then((data) => {
                            resolve(data[getRandomArbitrary(0, data.length - 1)])
                        })
                        .catch((err) => reject(err))
                })

                db.collection("users").updateOne(
                    { username: username },
                    isDaily["result"]
                    ? { 
                        $set: {
                            daily_quote: await q,    
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
                    .catch((err) => reject(err))
            })
            .catch((err) => reject(err)) 
    })
}

const isDailyFunc = async (username) => {
    return findByFunc(username)
        .then(data => {
            return {
                ["result"]: 
                    (dateToHours(new Date()) - dateToHours(data["date"])) >= 24,
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




