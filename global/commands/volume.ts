import DiscordJS, { EmbedBuilder, GuildResolvable, SlashCommandBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Muda o volume da música! ')
        .addNumberOption(options =>
            options
                .setName('volume')
                .setDescription('O volume (0 - 100)')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        let volumeToApply = interaction.options.getNumber('volume') as number
        let interactionmember = interaction.guild?.members.cache.get(interaction.user.id)

        const queue = client.player.queues.get(interaction.guildId as GuildResolvable)

        if (!interactionmember?.voice.channel) {
            interaction.reply({ content: 'Não posso mudar o volume, porque não estás num canal de voz!', ephemeral: true })
            return
        }

        if (!queue || !queue.connection) {
            interaction.reply({ content: 'Não posso mudar o volume, porque não existe nada na fila!', ephemeral: true })
            return
        }

        const currentVolume = queue.dispatcher?.volume

        await queue.dispatcher?.setVolume(volumeToApply)

        let embed = new EmbedBuilder()
                .setColor(0xb31207)
                .setDescription(`O volume foi mudado de ${currentVolume}% para ${volumeToApply}%`)
                .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })
                .setTimestamp()

        interaction.reply({ embeds: [embed] })
        cc.log(`O volume foi mudado de ${currentVolume}% para ${volumeToApply}% pelo ${interaction.user.tag}`, 'logWhite', 'info')
    }
}