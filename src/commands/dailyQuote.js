const { SlashCommandBuilder } = require('discord.js');
const { qEmbed } = require('../embeds.js')
const { findBy, update } = require('../db/setup.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qdaily')
		.setDescription('The quote of the day')
        .setDMPermission(false),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true });
            const username = msg.member.user.tag   

            await update(username)
            const data = await findBy(username)
            msg.editReply({
                embeds: [qEmbed(
                    data["daily_quote"]["author"],
                    data["daily_quote"]["text"],
                    `Requested by ${ username }`
                )],
            })
        } 
        catch (err) { 
            throw err 
        }
	},
};

