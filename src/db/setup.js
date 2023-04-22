require("dotenv").config()
const { MongoClient } = require("mongodb");


const dateToHours = date => {
    return Math.floor(date.getTime() / 3.6e+6)
}

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

module.exports = {
    findBy: findByFunc,
    insert: async (full_name) => {
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
    },

    differenceBetween: async (full_name, full_name2) => {
        try {
            return await findByFunc(full_name)
                .then(data => { 
                    return dateToHours(data[0].date)
                })
                .then(async (hours) => {
                    const hours2 = await findByFunc(full_name2)
                        .then(json => { 
                            return dateToHours(json[0].date)
                        })

                    return Math.abs(hours - hours2)
                })
        } 
        catch (err) { throw err }
    }
}




