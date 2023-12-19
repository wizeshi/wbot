import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { wizeshiCheck } from '../../global/funcs/wizeshicheck';
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wban')
        .setDescription('bane alguém')
        .addUserOption(options => 
            options.setName('banpessoa')
                .setDescription('Pessoa a banir')
                .setRequired(true))
        .addStringOption(options => 
            options.setName('razão')
                .setDescription('Razão a ser banida')
                .setRequired(false)),
    
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        const banUser = interaction.options.getUser('banpessoa') 
        const banMember = interaction.guild?.members.cache.get(`${banUser?.id}`)
        const razao = interaction.options.getString('razao') as String || `Nenhuma razão específicada.`

        wizeshiCheck(interaction)
        
        if (banMember?.id == interaction.user.id) {
            interaction.reply({ content: `<@${interaction.user.id}>, não te podes banir.`, ephemeral: true })
            return
        } else if (!banMember?.bannable) {
            interaction.reply({ content: `<@${interaction.user.id}>, não posso banir o <@${banMember?.id}>.`, ephemeral: true })
            return
        } else {
            interaction.reply({ content: `<${banMember.id}> foi banido!`, ephemeral: true })
            await interaction.guild?.members.ban(`${banMember.id}`)
            .catch(console.error)
            .then(() => cc.log(`${banMember.user.tag} foi banido pelo ${interaction.user.tag} pela razão:` + razao, 'logWhite', 'info'))
        }
    }
}