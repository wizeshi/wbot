import DiscordJS, { GuildResolvable } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole';
import { GuildQueue } from 'discord-player';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Vê o ping!'),
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        let queue = client.player.queues.get(interaction.guildId as GuildResolvable) as GuildQueue<unknown>

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        if (!queue) {
            await interaction.reply({ content: 'Não posso ver o ping, porque não está a tocar nenhuma música.', ephemeral: true })
            return
        }

        let ping = queue.ping

        await interaction.reply({ content: `O ping atual é de ${ping}ms.`})
        cc.log(`O ${interaction.user.tag} usou o /ping, e o ping é de ${ping}ms.`, 'logWhite', 'info')
    }
}