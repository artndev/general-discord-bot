require("dotenv").config()
const { MongoClient } = require("mongodb");
const { dateToHours } = require("../utils");

// !!!! СДЕЛАТЬ ОБНОВЛЕНИЕ ДАТЫ В БД ПОСЛЕ НАЖАТИИ НА КНОПКУ


const findByFunc = full_name => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(client => {
                const db = client.db("quotes_bot");
                db.collection("users").find({ full_name: full_name })
                    .toArray()
                    .then((arr) => { resolve(arr) })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err)) 
    })
}

const insertFunc = async (full_name) => {
    return new Promise(async (resolve, reject) => {
        if ((await findByFunc(full_name)).length > 0) 
            reject(false)

        MongoClient.connect(process.env.CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(client => {
                const db = client.db("quotes_bot");
                db.collection("users").insertOne({
                    full_name: full_name,
                    date: new Date()
                })
                    .then(() => resolve(true))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err)) 
    })
}

const isDailyFunc = async (full_name) => {
    return findByFunc(full_name)
        .then(data => { 
            return (dateToHours(new Date()) - dateToHours(data[0].date)) >= 24
        })
        .catch(err => {
            if (!(err instanceof TypeError))
                throw err
           
            insertFunc(full_name)
            return true
        })
}

module.exports = {
    findBy: findByFunc,
    insert: insertFunc,
    isDaily: isDailyFunc,
}




