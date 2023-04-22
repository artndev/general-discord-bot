const { SlashCommandBuilder, time } = require('discord.js');
const { QDAILY_API_URL } = require('../../config.json')

const { getData } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../buttons.js');
const { isDaily } = require('../db/setup.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qdaily')
		.setDescription('Quote of the day'),
	async execute(msg) {

        getData(QDAILY_API_URL)
            .then(async (json) => {
                await msg.reply({ 
                    embeds: [qEmbed(
                        json["quote"]["author"], 
                        json["quote"]["body"],
                        json["quote"]["tags"]
                    )],
                    components: [ qRow(
                        "I hate it. Next one!", 
                        await isDaily(msg.member.user.tag)
                    ) ],
                });
            })
            .catch(err => { throw err })
            .finally(console.log("The quote was created!"));
	},
};

