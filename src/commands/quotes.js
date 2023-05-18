const { SlashCommandBuilder } = require('discord.js');
const { getQuotes, fetchDigits } = require('../utils.js')
const { qsEmbed } = require('../embeds.js');
const { qsRow } = require('../rows.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotes')
		.setDescription('The list of quotes')
        .addNumberOption((opt) =>
            opt
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(25)
                .setName("amount")
                .setDescription("The amount of quotes")
        ),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true })

            // ? Body of the command
            const amount = msg.options.getNumber("amount")
            const quotes = await getQuotes(amount)
            // ? End of the body

            await msg.editReply({
                embeds: [
                    qsEmbed(
                        "The Quotes List",
                        quotes,
                        amount
                    )
                ],
                components: [ qsRow("Refresh") ],
            })
        } 
        catch (err) { console.log(err) }
	},
    async qsEdit(inter) {
        try {
            await inter.deferUpdate()

            // ? Body of the command
            const amount = await fetchDigits(inter.message.embeds[0].data.footer.text)
            const quotes = await getQuotes(amount)
            // ? End of the body
    
            await inter.editReply({
                embeds: [
                    qsEmbed(
                        "The Quotes List",
                        quotes,
                        amount
                    )
                ],
            }) 
        } 
        catch (err) { console.log(err) }  
    }
};

