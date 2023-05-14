const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
    qRow: (label, isDisabled = false) => {
        return new ActionRowBuilder().setComponents (
            new ButtonBuilder()
                .setCustomId("refresh")
                .setLabel(label)
                .setStyle(ButtonStyle.Success)
                .setEmoji("🟢")
                .setDisabled(isDisabled)
        )
    },
}