require("dotenv").config()
const { dateToHours, getRandomQuote } = require("../utils.js")
const UserModel = require("./Models/User.js")
const mongoose = require("mongoose")


module.exports = {
    findUser: async (username) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI) 
    
            // * Body of the function
            const doc = await UserModel.collection.findOne({ username: username })
            if (doc) {
                console.log("Пользователь успешно найден!\n", doc)
                return doc
            }
            else {
                console.log("Не удалось найти пользователя :(")
                return null
            }
            // * End of the body
        } 
        catch (err) { throw err }
        finally { 
            setTimeout(() => {
                mongoose.disconnect() 
            }, 3000)
        }
    },
    saveUser: async (username) => {
        try {
            const res = await module.exports.findUser(username)
            if (res) {
                const isDaily = (dateToHours(Date.now()) - dateToHours(res.date)) >= 24 
                if (isDaily)
                    await module.exports.updateUser(username)

                console.log("Такой USERNAME уже занят :(")
                return null
            }
            else {
                // * Body of the function       
                await mongoose.connect(process.env.CONNECTION_URI)      
        
                const doc = await (new UserModel({
                    username: username,
                    daily_quote: await getRandomQuote()
                })).save()
                if (doc) {
                    console.log("Пользователь успешно сохранен!\n", doc)
                    return doc
                }
                else {
                    console.log("Не удалось сохранить пользователя :(")
                    return null
                }
                // * End of the body
            }
        } 
        catch (err) { throw err }
        finally { 
            setTimeout(() => {
                mongoose.disconnect() 
            }, 3000)
        }
    },
    updateUser: async (username) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI) 
    
            // * Body of the function
            const doc = await UserModel.collection.findOneAndUpdate(
                { username: username },
                { 
                    $set: {
                        daily_quote: await getRandomQuote(),
                        date: new Date 
                    }
                }
            )
            if (doc) {
                console.log("Пользователь успешно обновлен!\n", doc)
                return doc
            }
            else {
                console.log("Не удалось обновить пользователя :(")
                return null
            }
            // * End of the body
        } 
        catch (err) { throw err }
        finally { 
            setTimeout(() => {
                mongoose.disconnect() 
            }, 3000)
        }    
    }
}

