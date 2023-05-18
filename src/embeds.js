const { EmbedBuilder } = require("discord.js");


module.exports = {
    qEmbed: (title, desc) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setDescription(desc)
            .setThumbnail("https://i.postimg.cc/T2mfZDC3/left-quotes-sign.png")
            .setTimestamp()
    },
    qsEmbed: (title, fields, amount) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setThumbnail("https://i.postimg.cc/T2mfZDC3/left-quotes-sign.png")
            .setTimestamp()
            .addFields(...fields)
            .setFooter({ text: `#${amount.toString()}` })
    },
}

