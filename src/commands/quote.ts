export {}
const { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction, 
    ButtonInteraction 
} = require('discord.js');
const { path } = require("app-root-path")
const { getQuote } = require(path + "/dist/other/utils.js")
const { qEmbed } = require(path + "/dist/other/embeds.js")
const { qRow } = require(path + "/dist/other/rows.js")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Random quote'),
	async execute(msg: typeof ChatInputCommandInteraction) {
        try {
            await msg.deferReply({ ephemeral: true });

            // ? Body of the command
            const quote = await getQuote()
            // ? End of the body
    
            await msg.editReply({
                embeds: [
                    qEmbed(
                        quote["author"], 
                        quote["text"]
                    )
                ],
                components: [ qRow("Refresh") ],
                files: [{
                    attachment: path + "/src/imgs/quotes-sign.png",
                    name: "quotes-sign.png"
                }]
            })
        } 
        catch (err: any) { 
            console.log(err) 
        }
	},
    async qEdit(inter: typeof ButtonInteraction) {
        try {
            if (inter.member.user.tag !== inter.user.tag)
                return
            await inter.deferUpdate()

            // ? Body of the command
            const quote = await getQuote()
            // ? End of the body
    
            await inter.editReply({
                embeds: [
                    qEmbed(
                        quote["author"], 
                        quote["text"]
                    )
                ],
            }) 
        } 
        catch (err: any) { 
            console.log(err) 
        }       
    }
};