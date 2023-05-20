require("dotenv").config()
const { REST, Routes } = require('discord.js');
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;
const rootPath = require("app-root-path").path
const { COMMANDS_FOLDER } = require("../config.json")
const fs = require("fs");

const commands = [];
const commandsPath = rootPath + COMMANDS_FOLDER // path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`${rootPath}/dist/commands/${file}`);

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} 
	catch (err) {
		console.error(err);
	}
})();