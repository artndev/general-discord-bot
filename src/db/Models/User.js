const { Schema, model } = require("mongoose")


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    daily_quote: {
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
    },
    date: { 
        type: Date,
        default: Date.now,
        required: false
    }
}, { collection: "users" })
module.exports = model("User", userSchema, "users")