import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { wizeshiCheck } from '../../global/funcs/wizeshicheck';
import { cc } from '../../global/funcs/customConsole';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apagarcanal')
        .setDescription('Apagar canais com o mesmo nome (A caso de se alguém fizer merda)')
        .addStringOption(option => 
            option.setName('canal')
            .setDescription('Nome dos canais a serem apagados')
            .setRequired(true)),
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        wizeshiCheck(interaction)

        const canal = interaction.options.getString('canal') as string
        const apagarCanal = interaction.guild?.channels.cache.find(channel => channel.name = canal)
        //@ts-ignore
        if (apagarCanal !== interaction.guild?.channels) {
            interaction.guild?.channels.cache.find((channel) => {
            if (channel.name.includes(`${canal}`)) {
                channel.delete()
                .then(() => cc.log(`Canal ${channel.name} deletado`, 'logWhite', 'info'))
                .catch(console.error)
                }
            })
        }
    }
}