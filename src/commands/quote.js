const { SlashCommandBuilder } = require('discord.js');
const { getQuote } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../rows.js')
const { path } = require("app-root-path")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Random quote'),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true });

            // ? Body of the command
            const quote = await getQuote()
            // ? End of the body
    
            await msg.editReply({
                embeds: [
                    qEmbed(
                        quote["author"], 
                        quote["text"]
                    )
                ],
                components: [ qRow("Refresh") ],
                files: [{
                    attachment: path + "/src/imgs/quotes-sign.png",
                    name: "quotes-sign.png"
                }]
            })
        } 
        catch (err) { 
            console.log(err) 
        }
	},
    async qEdit(inter) {
        try {
            if (inter.member.user.tag !== inter.user.tag)
                return
            await inter.deferUpdate()

            // ? Body of the command
            const quote = await getQuote()
            // ? End of the body
    
            await inter.editReply({
                embeds: [
                    qEmbed(
                        quote["author"], 
                        quote["text"]
                    )
                ],
            }) 
        } 
        catch (err) { 
            console.log(err) 
        }       
    }
};