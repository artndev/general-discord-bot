const { EmbedBuilder } = require("discord.js");


module.exports = {
    qEmbed: (title, desc, footer) => {
        return new EmbedBuilder()
            .setColor("#00af80")
            .setTitle(title)
            .setDescription(desc)
            .setThumbnail("https://i.postimg.cc/T2mfZDC3/left-quotes-sign.png")
            .setTimestamp()
            .setFooter({ text: footer })
    },
}

