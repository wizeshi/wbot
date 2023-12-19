import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { wizeshiCheck } from '../../global/funcs/wizeshicheck';
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cargos')
        .setDescription('Dá-te o cargo que escolheres 🏳️')
        .addRoleOption(options => 
            options.setName('cargo')
                .setDescription('Menciona o cargo que queres!')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        wizeshiCheck(interaction)

        let giveRolesUser = interaction.user
        let giveRolesMember = interaction.guild?.members.cache.get(`${giveRolesUser.id}`)
        let giveRolesUserId = giveRolesMember?.id
        let role = interaction.options.getRole('cargo')
        let roleGive = interaction.guild?.roles.cache.get(`${role?.id}`) as DiscordJS.Role

        if (!roleGive.editable) {
            interaction.reply({ content: `Não tenho cargos suficientes para dar o cargo ${roleGive}`, ephemeral: true})
                .then(() => cc.log(`${interaction.user.tag} tentou dar-se o cargo ${role?.name}, mas eu não tenho permissões.`, 'errorRed', 'error'))
            return
        } else if (giveRolesMember?.roles.cache.has(`${role?.id}`)) {
            /* interaction.guild?.members.cache.get(`${giveRolesUserId}`)?.roles.remove(roleGive)
                .then(() => cc.log(`Cargo ${role?.name} retirado ao ${giveRolesMember?.user.username}`, 'logWhite', 'info'))
                .catch(console.error)
            interaction.reply({ content: `Okay, cargo ${roleGive} retirado ao <@${giveRolesUserId}>.`, ephemeral: true}) */

            interaction.reply({ content: `<@${giveRolesUserId}>, já tens o cargo ${roleGive.name}!`, ephemeral: true})
                .then(() => cc.log(`${giveRolesMember?.user.username} ${lang.getServerText('roles.tried')} ${role?.name}, ${lang.getServerText('roles.failed.alreadyhas')}`, 'warningYellow', 'warn'))
        } else {
            if (role) interaction.guild?.members.cache.get(`${giveRolesUserId}`)?.roles.add(roleGive)
                .then(() => cc.log(`Cargo ${role?.name} dado ao ${giveRolesMember?.user.username}`, 'logWhite', 'info'))
                .catch(console.error)
            interaction.reply({ content: `Okay, cargo ${roleGive} para o <@${giveRolesUserId}>! ✅`, ephemeral: true})
        }
    }
}