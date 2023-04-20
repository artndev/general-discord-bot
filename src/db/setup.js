require("dotenv").config()
const { MongoClient } = require("mongodb");


const findByFunc = (full_name) => {
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
    // !!! ДОДЕЛАТЬ РАЗНИЦУ ВРЕМЕНИ 2-УХ ПОЛЬЗОВАТЕЛЕЙ
    differenceBetween: async (full_name, full_name2) => {
        try {
            return await findByFunc(full_name)
                .then(data => { 
                    return data[0].date.getHours() 
                })
                .then(async (data) => {
                    const hours = await findByFunc(full_name2)
                        .then(json => { 
                            return json[0].date.getHours() 
                        })
                    return data - hours
                })
                .then(res => {
                    return Math.abs(res)
                })
        } 
        catch (err) { throw err }
    }
}



