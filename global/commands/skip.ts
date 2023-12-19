import DiscordJS, { GuildResolvable } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Track } from 'discord-player';
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pular')
        .setDescription('Pula a música a tocar 🎶'),
    
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        const queue = client.player.queues.get(interaction.guildId as GuildResolvable)

        if (!queue) {
            await interaction.reply({ content:'Não podes pular, porque não está a tocar uma música!', ephemeral: true })
            return
        }

        const currentSong = queue.currentTrack as Track

        queue.node.skip()
        cc.log(`Música ${currentSong.title} pulada.`, 'logWhite', 'info')

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**${currentSong.title}** pulado.`)
                    .setThumbnail(currentSong.thumbnail)
                    .setTimestamp()
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
            ]
        })
    }
}