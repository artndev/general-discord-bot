require("dotenv").config()
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN } = process.env;
const { 
	QUOTABLE_RANDOM_API_URL,
	QUOTABLE_MAIN_API_URL
} = require("../config.json")
const { getData } = require("./utils.js")
const { quoteEmbed } = require('./embeds.js')
const { quoteRow } = require('./buttons.js')
const fs = require('fs');
const path = require('path');

const client = new Client({
	intents: [ GatewayIntentBits.Guilds ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);


for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	// if (!interaction.isChatInputCommand()) return;

	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
	
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	}
	else if (interaction.isButton()) {
		if (
			interaction.message.interaction.commandName === "quote" &&
			interaction.customId === "refresh"
		) {
			getData(QUOTABLE_RANDOM_API_URL)
				.then(async (json) => { 
					await interaction.message.edit({ 
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
				.finally(() => {
					interaction.deferUpdate()
					console.log("The quote was edited!")
				});
		}
	}
});

client.login(DISCORD_TOKEN);