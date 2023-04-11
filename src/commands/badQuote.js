const { SlashCommandBuilder } = require('discord.js');
const { BRAKINGBAD_QUOTES_RANDOM_API_URL } = require('../../config.json')

const { getData } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qbadRow } = require('../buttons.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qbad')
		.setDescription('Random "Breaking bad" quote'),
	async execute(msg) {
        getData(BRAKINGBAD_QUOTES_RANDOM_API_URL)
            .then(async (json) => {
                await msg.reply({ 
                    embeds: [qEmbed(
                        json[0]["author"], 
                        json[0]["quote"],
                        []
                    )],
                    components: [ qbadRow() ],
                });
            })
            .catch(err => { throw err })
            .finally(console.log("The quote was created!"));
	},
};