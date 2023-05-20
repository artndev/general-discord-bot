const { ActionRowBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
    qRow: (label: string) => {
        return new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId("qRefresh")
                .setLabel(label)
                .setStyle(ButtonStyle.Success)
        )
    },
    qsRow: (label: string) => {
        return new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId("qsRefresh")
                .setLabel(label)
                .setStyle(ButtonStyle.Success)
        )
    }
}