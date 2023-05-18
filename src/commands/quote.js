const { SlashCommandBuilder } = require('discord.js');
const { getQuote } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../rows.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('The random quote'),
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
            })
        } 
        catch (err) { console.log(err) }
	},
    async qEdit(inter) {
        try {
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
        catch (err) { console.log(err) }       
    }
};