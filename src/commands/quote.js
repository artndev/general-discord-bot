const { SlashCommandBuilder } = require('discord.js');
const { QRANDOM_API_URL } = require('../../config.json')

const { getData, getRandomArbitrary } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../buttons.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('q')
		.setDescription('A random quote'),
	async execute(msg) {
        getData(QRANDOM_API_URL)
            .then(async (data) => {
                const quote = data[getRandomArbitrary(0, data.length - 1)]
                
                await msg.reply({ 
                    embeds: [qEmbed(
                        quote["author"], 
                        quote["text"],
                        `Requested by ${ msg.member.user.tag }`
                    )],
                    components: [ qRow("Refresh") ],
                });
            })
            .catch((err) => { 
                throw err 
            })
            .finally(console.log("The quote was created!"));
	},
    async edit(interaction) {
        getData(QRANDOM_API_URL)
            .then(async (data) => { 
                const msg = interaction.message
                const quote = data[getRandomArbitrary(0, data.length - 1)]
                
                await msg.edit({ 
                    embeds: [qEmbed(
                        quote["author"], 
                        quote["text"],
                        `Requested by ${ msg.interaction.user.tag }`
                    )],
                });
            })
            .catch((err) => {
                throw err
            })
            .finally(interaction.deferUpdate());
    }
};