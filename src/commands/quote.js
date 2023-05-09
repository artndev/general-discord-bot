const { SlashCommandBuilder } = require('discord.js');
const { QUOTES_API_URL } = require('../../config.json')
const { getData, getRandomArbitrary, getRandomQuote } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../buttons.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('q')
		.setDescription('The random quote')
        .setDMPermission(true),
	async execute(msg) {
        await msg.deferReply({ ephemeral: true });

        // * Body of the command
        const quote = await getData(QUOTES_API_URL)
            .then((data) => {
                return data[ getRandomArbitrary(0, data.length - 1) ]
            })
            .catch((err) => {
                throw err
            })
        // * End of the body

        msg.editReply({
            embeds: [qEmbed(
                quote["author"], 
                quote["text"],
                `Requested by ${ msg.member.user.tag }`
            )],
            components: [ qRow("Refresh") ],
        })
	},
    async edit(inter) {
        await inter.deferUpdate()

        // * Body of the command
        const quote = await getData(QUOTES_API_URL)
            .then((data) => {
                return data[ getRandomArbitrary(0, data.length - 1) ]
            })
            .catch((err) => {
                throw err
            })
        // * End of the body

        inter.editReply({
            embeds: [qEmbed(
                quote["author"], 
                quote["text"],
                `Requested by ${ inter.user.tag }`
            )]
        })        
    }
};