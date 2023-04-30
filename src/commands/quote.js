const { SlashCommandBuilder } = require('discord.js');
const { QRANDOM_API_URL } = require('../../config.json')

const { getData } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../buttons.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('q')
		.setDescription('A random quote'),
	async execute(msg) {
        getData(QRANDOM_API_URL)
            .then(async (json) => {
                await msg.reply({ 
                    embeds: [qEmbed(
                        json["author"], 
                        json["content"],
                        json["tags"]
                    )],
                    components: [ qRow("Refresh") ],
                });
            })
            .catch(err => { throw err })
            .finally(console.log("The quote was created!"));
	},
};