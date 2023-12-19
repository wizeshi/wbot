import DiscordJS, { ButtonStyle } from 'discord.js'
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botão')
        .setDescription('O BOTÃO!'),
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Cargos?')
                    .setStyle(ButtonStyle.Success),
                
                new ButtonBuilder()
                    .setCustomId('secondary')
                    .setLabel('Unban?')
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setCustomId('terciary')
                    .setLabel('Entrar na chamada?')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ content: `O que queres fazer, <@${interaction.user.id}>?`, ephemeral: true, components: [row]})
        cc.log(`O @${interaction.user.tag} usou o botão.`, 'logWhite', 'info')
    }
}