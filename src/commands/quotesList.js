const { SlashCommandBuilder } = require('discord.js');
const { getQuotes } = require('../utils.js')
const { qEmbed } = require('../embeds.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotes')
		.setDescription('The list of quotes')
        .addNumberOption((opt) =>
            opt
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(10)
                .setName("amount")
                .setDescription("The amount of quotes")
        ),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true });

            // * Body of the command
            const quotes = await getQuotes(msg.options.getNumber("amount"))
            // * End of the body

            await msg.editReply({
                embeds: [qEmbed(
                    "The Quote List",
                    quotes,
                    `Requested by ${ msg.member.user.tag  }`
                )],
            })
        } 
        catch (err) { console.log(err) }
	},
};

