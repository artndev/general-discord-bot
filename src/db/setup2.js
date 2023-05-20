require("dotenv").config()
const { dateToHours } = require("../utils.js")
const UserModel = require("./Models/User.js")
const mongoose = require("mongoose")


module.exports = {
    saveUser: async (username, daily_quote) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI)
        
            const doc = await new UserModel({
                username: username,
                daily_quote: daily_quote
            }).save()
            if (doc)
                console.log("Пользователь успешно сохранен!\n", doc)
            else
                console.log("Не удалось сохранить пользователя :(")
        } 
        catch (err) { throw err }
        finally { 
            setTimeout(() => {
                mongoose.disconnect() 
            }, 3000)
        }
    },
    findUser: async (username) => {
        try {
            await mongoose.connect(process.env.CONNECTION_URI)            

            const res = await UserModel.collection.findOne({ username: username })
            if (res) {
                const isDaily = (Date.now() - dateToHours(res.date)) >= 24
                if (isDaily) {
                    UserModel.collection.findOneAndUpdate(
                        { username: username },
                        { 
                            $set: {
                                date: new Date 
                            }
                        }
                    )
                }

                console.log("Пользователь успешно найден!\n", res, isDaily)
            }
            else
                console.log("Не удалось найти пользователя :(")
        } 
        catch (err) { throw err }
        finally { 
            setTimeout(() => {
                mongoose.disconnect() 
            }, 3000)
        }
    },
}

