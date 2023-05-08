const { SlashCommandBuilder } = require('discord.js');
const { qEmbed } = require('../embeds.js')
const { findBy, update } = require('../db/setup.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qdaily')
		.setDescription('The quote of the day'),
	async execute(msg) {
        try {
            const username = msg.member.user.tag   

            await update(username)
            findBy(username)
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
        catch (err) { throw err }
	},
};

