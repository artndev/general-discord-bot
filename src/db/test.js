const { insert, findBy, differenceBetween, updateQuote, isDaily } = require('./setup.js')


// insert("discord#6666")
//     .then((data) => console.log(data))

// differenceBetween("discord#1111", "discord#0000").then((data) => console.log(data))


isDaily("discord#1111")
    .then((data) => console.log(data))

    // const isDailyFunc = full_name => {
    //     return findByFunc(full_name)
    //         .then(async (data) => { 
    //             const res = dateToHours(new Date()) - dateToHours(data[0].date)
    //             if (res >= 24) {
    //                 await updateFunc(full_name)
    
    //                 return true
    //             }
    //             else
    //                 return false
    //         })
    //         .catch(err => { throw err })
    // }