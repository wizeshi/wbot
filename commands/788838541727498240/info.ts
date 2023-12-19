import DiscordJS, { SlashCommandBuilder } from 'discord.js'
import { infoFunc } from '../../global/funcs/respostas/infoFunc'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lore')
        .setDescription('Informações sobre o bot!'),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        infoFunc(interaction)
    }
}