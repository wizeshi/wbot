import { GuildQueue } from 'discord-player'
import DiscordJS, { EmbedBuilder, GuildResolvable, SlashCommandBuilder } from 'discord.js'
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remover')
        .setDescription('Remove uma música pelo número da fila!')
        .addNumberOption(options => 
            options
                .setName('numeromusica')
                .setDescription('O número da música na fila.')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        let numeromusicaunusable = interaction.options.getNumber('numeromusica') as number
        let numeromusica = numeromusicaunusable - 1

        const queue = client.player.queues.get(interaction.guildId as GuildResolvable) as GuildQueue<unknown>


        if (numeromusica > queue.tracks.toArray().length) {
            interaction.reply({ content: 'Não podes remover essa música, porque não existe!', ephemeral: true })
            return
        }

        const songRemoved = queue.tracks.toArray()[numeromusica]
        await queue.node.remove(numeromusica)

        let embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setDescription(`A música ${songRemoved.title} foi removida da fila.`)
            .setThumbnail(songRemoved.thumbnail)
            .setTimestamp()
            .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string  })
        
        interaction.reply({ embeds: [embed]})

        cc.log(`A música foi removida da fila:\n  Nome: ${songRemoved.title}\n  URL: ${songRemoved.url}\n  Quem adicionou: ${interaction.user.tag}`, 'logWhite', 'info')
    }
}