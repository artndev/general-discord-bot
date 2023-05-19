const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
    qRow: (label) => {
        return new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId("qRefresh")
                .setLabel(label)
                .setStyle(ButtonStyle.Success)
        )
    },
    qsRow: (label) => {
        return new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId("qsRefresh")
                .setLabel(label)
                .setStyle(ButtonStyle.Success)
        )
    }
}