import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tirarperms')
        .setDescription('Tirar permissões a quem se achar engração (precisa de ser o wizeshi para usar)')
        .addUserOption(options => 
            options.setName('pessoa')
                .setDescription('Pessoa que queres tirar as permissões')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        var semPerms = interaction.options.getUser('pessoa')
        var semPermsMembro = interaction.guild?.members.cache.get(`${semPerms?.id}`)
        interaction.reply({content: `Foram retiradas permissões de comandos ao <@${semPerms?.id}>`, ephemeral: true})
    }
}