const { SlashCommandBuilder } = require('discord.js');
const { QBREAKINGBAD_API_URL } = require('../../config.json')

const { getData } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../buttons.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qbad')
		.setDescription('Random "Breaking bad" quote'),
	async execute(msg) {
        getData(QBREAKINGBAD_API_URL)
            .then(async (json) => {
                await msg.reply({ 
                    embeds: [qEmbed(
                        json[0]["author"], 
                        json[0]["quote"],
                        []
                    )],
                    components: [ qRow("Refresh") ],
                });
            })
            .catch(err => { throw err })
            .finally(console.log("The quote was created!"));
	},
};