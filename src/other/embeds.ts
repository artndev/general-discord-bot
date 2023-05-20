const { EmbedBuilder } = require("discord.js");


module.exports = {
    qEmbed: (title: string, desc: string) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setDescription(desc)
            .setThumbnail("attachment://quotes-sign.png")
            .setTimestamp()
    },
    qsEmbed: (title: string, amount: number, fields: {name: string, value: string}[]) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setThumbnail("attachment://quotes-sign.png")
            .setTimestamp()
            .addFields(...fields)
            .setFooter({ text: `#${amount.toString()}` })
    },
}

