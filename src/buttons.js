const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports.quoteRow = url => {
    return new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder()
                .setCustomId("refresh")
                .setLabel("Refresh")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🔃"),
            new ButtonBuilder()
                .setLabel("Inspect")
                .setStyle(ButtonStyle.Link)
                .setEmoji("🔢")
                .setURL(url)
        )
} 