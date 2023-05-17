const { SlashCommandBuilder } = require('discord.js');
const { qEmbed } = require('../embeds.js')
const { saveUser } = require('../db/index.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily_quote')
		.setDescription('The quote of the day'),
	async execute(msg) {
        try {
            await msg.deferReply({ ephemeral: true });

            // * Body of the command
            const username = msg.member.user.tag 
            const user = await saveUser(username)
            console.log(user)
            // * End of the body

            await msg.editReply({
                embeds: [
                    qEmbed(
                        user["daily_quote"]["author"],
                        user["daily_quote"]["text"],
                        `Requested by ${ username }`
                    )
                ],
            })
        } 
        catch (err) { console.log(err) }
	},
};

