const { SlashCommandBuilder } = require('discord.js');
const { getQuotes } = require('../utils.js')
const { qsEmbed } = require('../embeds.js')


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
            const amount = msg.options.getNumber("amount")
            const quotes = await getQuotes(amount)
            // * End of the body

            await msg.editReply({
                embeds: [
                    qsEmbed(
                        "The Quote List",
                        `There are your ${ amount.toString() } quotes...`,
                        `Requested by ${ msg.member.user.tag  }`,
                        quotes
                    )
                ],
            })
        } 
        catch (err) { console.log(err) }
	},
};

