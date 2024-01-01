import DiscordJS, { SlashCommandBuilder } from 'discord.js'
import { handleServerCommand } from './server/handleCommand'

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("Acessa o servidor de mine"),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        await handleServerCommand(interaction)
    }
}