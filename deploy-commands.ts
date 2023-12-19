const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv')
import fs from 'node:fs';
import path from "node:path";
import { cc } from './global/funcs/customConsole';

dotenv.config()

const commands: Array<never> = [];

const commandsPath = path.join(__dirname, 'commands/788838541727498240')

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/788838541727498240/${file}`);
	const commandToUse = command.data.toJSON() as never
	commands.push(commandToUse);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

console.log(rest);

(async () => {
	try {
		cc.log(`A atualizar ${commands.length} comandos (/) da aplicação.`, 'devGreen', 'info');

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
			{ body: commands },
		);

		console.log(commands)

		cc.log(`${data.length} comandos (/) da aplicação foram recarregados.`, 'devGreen', 'info');
	} catch (error) {
		console.error(error);
	}
})();