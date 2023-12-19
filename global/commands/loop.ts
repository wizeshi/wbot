import { QueueRepeatMode } from "discord-player";
import DiscordJS, { EmbedBuilder, GuildResolvable, SlashCommandBuilder } from "discord.js";

import { cc } from "../../global/funcs/customConsole";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('onrepeat')
        .setDescription('Ouve a música em loop!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('fila')
                .setDescription('Loop da fila'))
        .addSubcommand(subcommand => 
            subcommand
                .setName('música')
                .setDescription('Loop da música')),
        
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        let queue = client.player.queues.get(interaction.guildId as GuildResolvable)

        if (!queue) {
            interaction.reply({ content: 'Não posso ligar/desligar o loop, porque não está a tocar nenhuma música.', ephemeral: true})
            return
        }

        if (interaction.options.getSubcommand() === "fila") {
            if (queue.repeatMode === QueueRepeatMode.QUEUE) {
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY)

                let embed = new EmbedBuilder()
                    .setColor(0xb31207)
                    .setDescription('Loop da fila desligado!.')
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
                    .setTimestamp()

                interaction.reply({ embeds: [embed] })
                cc.log('Loop da fila desligado!', 'logWhite', 'info')
            } else {
                queue.setRepeatMode(QueueRepeatMode.QUEUE)

                let embed = new EmbedBuilder()
                    .setColor(0xb31207)
                    .setDescription('Loop da fila ligado!.')
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
                    .setTimestamp()

                interaction.reply({ embeds: [embed] })
                cc.log('Loop da fila ligado!', 'logWhite', 'info')
            }
        }
        if (interaction.options.getSubcommand() === "música") {
            if (queue.repeatMode === QueueRepeatMode.TRACK ) {
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY)

                let embed = new EmbedBuilder()
                    .setColor(0xb31207)
                    .setDescription('Loop da música desligado!.')
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
                    .setTimestamp()

                interaction.reply({ embeds: [embed] })
                cc.log('Loop da música desligado!', 'logWhite', 'info')
            } else {
                queue.setRepeatMode(QueueRepeatMode.TRACK)

                let embed = new EmbedBuilder()
                    .setColor(0xb31207)
                    .setDescription('Loop da música ligado!.')
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
                    .setTimestamp()

                interaction.reply({ embeds: [embed] })
                cc.log('Loop da música ligado!', 'logWhite', 'info')
            }
        }
    }
}