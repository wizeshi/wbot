import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wunban')
        .setDescription('Tira o ban de um bacano! :)')
        .addStringOption(options => 
            options.setName('unbanpessoa')
                .setDescription('Pessoa a tirar o ban 🔨 (nome)')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        const banUserName = interaction.options.getString('unbanpessoa')
        let unbanEnviarMensagem

        interaction.guild?.bans.fetch().then(bans => {
            bans.forEach(banned => {
                if (banned.user.username !== banUserName) {
                    interaction.reply({ content: `<@${banned.user.id}> não está banido! ❌`, ephemeral: true})
                    cc.log(`O ${interaction.user.tag} tentou desbanir o ${banned.user.tag}, mas ele não está banido! ❌`, 'errorRed', 'error')
                } else if (banned.user.username === banUserName) {
                    interaction.guild?.members.unban(banned.user.id)
                    interaction.reply({ content: `<$${banned.user.id}> foi desbanido! 🔨`, ephemeral: true })
                    cc.log(`O ${banned.user.tag} foi desbanido pelo ${interaction.user.id}! 🔨`, 'logWhite', 'info')
                } 
            })
        })
    }
}