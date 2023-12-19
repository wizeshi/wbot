import DiscordJS, { GuildResolvable } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('retomar')
        .setDescription('Retoma a música a tocar ▶️'),
    
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }
        const queue = client.player.queues.get(interaction.guildId as GuildResolvable)

        if (!queue) {
            await interaction.reply({ content:'Não podes retomar, porque não está a tocar uma música!', ephemeral: true })
            return
        }

        queue.node.resume()

        let embed = new EmbedBuilder()
                    .setColor(0xb31207)
                    .setDescription('A música foi retomada ▶️.')
                    .setTimestamp()
                    .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string })

        interaction.reply({ embeds: [embed] })
        cc.log('A música foi retomada.', 'logWhite', 'info')
    }
}