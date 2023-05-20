export {}
const { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction, 
    ButtonInteraction,
    SlashCommandNumberOption
} = require('discord.js');
const { path } = require("app-root-path")
const { getQuotes, fetchDigits } = require(path + "/dist/other/utils.js")
const { qsEmbed } = require(path + "/src/other/embeds.js")
const { qsRow } = require(path + "/src/other/rows.js")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotes')
		.setDescription('List of quotes')
        .addNumberOption((opt: typeof SlashCommandNumberOption) =>
            opt
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(25)
                .setName("amount")
                .setDescription("The amount of quotes")
        ),
	async execute(msg: typeof ChatInputCommandInteraction) {
        try {
            await msg.deferReply({ ephemeral: true })

            // ? Body of the command
            const amount = msg.options.getNumber("amount")
            const quotes = await getQuotes(amount)
            // ? End of the body

            await msg.editReply({
                embeds: [
                    qsEmbed(
                        "The Quotes List",
                        quotes,
                        amount
                    )
                ],
                components: [ qsRow("Refresh") ],
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
    async qsEdit(inter: typeof ButtonInteraction) {
        try {
            if (inter.member.user.tag !== inter.user.tag)
                return
            await inter.deferUpdate()

            // ? Body of the command
            const amount = await fetchDigits(inter.message.embeds[0].data.footer.text)
            const quotes = await getQuotes(amount)
            // ? End of the body
    
            await inter.editReply({
                embeds: [
                    qsEmbed(
                        "The Quotes List",
                        quotes,
                        amount
                    )
                ],
            }) 
        } 
        catch (err: any) { 
            console.log(err) 
        }  
    }
};

