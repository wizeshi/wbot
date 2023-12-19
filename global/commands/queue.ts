import DiscordJS, { GuildResolvable } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole';
import { Track } from 'discord-player';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fila')
        .setDescription('Mostra a fila das músicas.'),
    
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        const queue = client.player.queues.get(interaction.guildId as GuildResolvable)

        if (!queue || !queue.isPlaying) {
            await interaction.reply('Não está a tocar nenhuma música.')
            return
        }

        const queueString = queue.tracks.toArray().slice(0, 100).map((song, i) => {
            return `${i + 1})  [${song.duration}]\ ${song.title} - <@${song.requestedBy?.id}>`
        }).join("\n")

        const currentSong = queue.currentTrack as Track
        
        const volume = queue.dispatcher?.volume

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0xb31207)
                    .setDescription(`**A tocar:**\n ${currentSong.title} - <@${currentSong.requestedBy?.id}>\n\n**Fila:**\n ${queueString}\n\nVolume: ${volume}%`)
                    .setThumbnail(currentSong.thumbnail)
                    .setTimestamp()
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
            ]
        })

        cc.log(`O ${interaction.user.tag} pediu para ver a fila.`, 'logWhite', 'info')
    }
}