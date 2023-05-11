const { findUser, saveUser } = require("./setup2.js")

const utcDate1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
console.log(utcDate1)
findUser("discord#1111").then((data) => console.log(data))

//saveUser("discord#1111", {author: "Test", text: "Test"})
//(QUOTES_API_URL).then((data) => { console.log(data.length) })
    
