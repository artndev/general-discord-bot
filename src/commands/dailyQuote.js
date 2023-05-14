const { SlashCommandBuilder } = require('discord.js');
const { qEmbed } = require('../embeds.js')
const { saveUser } = require('../db/setup2.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('qdaily')
		.setDescription('The quote of the day')
        .setDMPermission(false),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true });

            // * Body of the command
            const username = msg.member.user.tag   
            await saveUser(username)
            const data = await findBy(username)
            // * End of the body

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

