const { SlashCommandBuilder } = require('discord.js');
const { 
    QUOTABLE_RANDOM_API_URL, 
    QUOTABLE_MAIN_API_URL 
} = require('../../config.json')

const { getData } = require('../utils.js')
const { quoteEmbed } = require('../embeds.js')
const { quoteRow } = require('../buttons.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('A random quote!'),
	async execute(msg) {
        getData(QUOTABLE_RANDOM_API_URL)
            .then(async (json) => {
                // console.log(json) 
                await msg.reply({ 
                    embeds: [quoteEmbed(
                        json["author"], 
                        json["content"],
                        json["tags"]
                    )],
                    components: [ 
                        quoteRow(QUOTABLE_MAIN_API_URL + json["_id"]) 
                    ],
                });
            })
            .catch(err => { throw err })
            .finally(console.log("The quote was created!"));
	},
};