const { SlashCommandBuilder } = require('discord.js');
const { qEmbed } = require("../embeds.js")
const { saveUser } = require("../db/index.js");
const { path } = require("app-root-path")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily_quote')
		.setDescription('Quote of the day'),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true });

            // ? Body of the command
            const user = await saveUser(msg.member.user.tag)
            // ? End of the body

            await msg.editReply({
                embeds: [
                    qEmbed(
                        user["daily_quote"]["author"],
                        user["daily_quote"]["text"]
                    )
                ],
                files: [{
                    attachment: path + "/src/imgs/quotes-sign.png",
                    name: "quotes-sign.png"
                }]
            })
        } 
        catch (err) { 
            if (err instanceof Error) {
                console.error(err)
            } 
        }
	},
};

