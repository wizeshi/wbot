import DiscordJS, { GuildResolvable, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { GuildQueue } from "discord-player";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Dá shuffle ás músicas! 🔀'),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }
        var queue = client.player.queues.get(interaction.guildId as GuildResolvable) as GuildQueue<unknown>

        if (!queue) {
            interaction.reply({
                content: 'Não está a tocar nada!',
                ephemeral: true
            })
            return
        }

        try {
            queue.tracks.shuffle()

            if (bot.shouldSkipWhenShuffled() == true) {
                queue.node.skip()
            }
        } catch {
            interaction.reply({
                content: "Houve um erro!",
                ephemeral: true,
            })
            return
        }

        var embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setDescription(`A fila foi misturada com sucesso!`)
            .setTimestamp()
            .setThumbnail(`${client.user?.avatarURL() as string}`)
            .setFooter({ text: `${queue.getSize()} músicas 👍 | Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string  })

        interaction.reply({
            embeds: [embed]
        })
    }
}