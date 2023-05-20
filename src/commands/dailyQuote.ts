export {}
const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { path } = require("app-root-path")
const { qEmbed } = require(path + "/dist/other/embeds.js")
const { saveUser } = require(path + "/dist/db/index.js");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily_quote')
		.setDescription('Quote of the day'),
	async execute(msg: typeof ChatInputCommandInteraction) {
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
        catch (err: any) { 
            console.error(err) 
        }
	},
};

