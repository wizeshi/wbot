import DiscordJS, { EmbedBuilder, GuildResolvable } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('die')
        .setDescription('Sai do canal de voz'),
    
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }
        
        const queue = client.player.queues.get(interaction.guildId as GuildResolvable)

        if (!queue) {
            await interaction.reply({ content:'Não posso sair, porque não estou no canal!', ephemeral: true })
            return
        }

        queue.delete()

        let embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setDescription('Saí do canal de voz.')
            .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
        cc.log(`O ${interaction.user.tag} mandou me sair do canal de voz.`, 'logWhite', 'info')
    }
}