const { SlashCommandBuilder, time } = require('discord.js');
const { QRANDOM_API_URL } = require('../../config.json')

const { getData } = require('../utils.js')
const { qEmbed } = require('../embeds.js')
const { qRow } = require('../buttons.js');
const { isDaily, findBy, update } = require('../db/setup.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qdaily')
		.setDescription('Quote of the day'),
	async execute(msg) {
        try {
            const fullName = msg.member.user.tag   

            await update(fullName)
            findBy(fullName)
                .then(async (data) => {    
                    await msg.reply({ 
                        embeds: [qEmbed(
                            data["daily_quote"]["author"],
                            data["daily_quote"]["content"],
                            data["daily_quote"]["tags"]
                        )]
                    });
                })
        } 
        catch (err) {
            throw err
        }
	},
};

