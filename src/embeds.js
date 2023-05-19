const { EmbedBuilder } = require("discord.js");


module.exports = {
    qEmbed: (title, desc) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setDescription(desc)
            .setThumbnail("attachment://quotes-sign.png")
            .setTimestamp()
    },
    qsEmbed: (title, fields, amount) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setThumbnail("attachment://quotes-sign.png")
            .setTimestamp()
            .addFields(...fields)
            .setFooter({ text: `#${amount.toString()}` })
    },
}

