import DiscordJS, { GuildResolvable, SlashCommandBuilder } from 'discord.js'
import { GuildQueue } from 'discord-player'
import { EmbedBuilder } from '@discordjs/builders'
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('limpar')
        .setDescription('Remove todas as músicas da fila!'),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        let queue = client.player.queues.get(interaction.guildId as GuildResolvable) as GuildQueue<unknown>

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        if (!queue) {
            await interaction.reply({ content: 'Não posso limpar a fila, porque não está a tocar nenhuma música.', ephemeral: true })
            return
        }

        queue.tracks.clear()

        let embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setDescription('A fila foi limpa.')
            .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
        cc.log(`A fila foi limpa pelo ${interaction.user.tag}.`, 'logWhite', 'info')
    }
}