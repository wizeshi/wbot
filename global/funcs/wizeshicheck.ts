import DiscordJS from "discord.js"

/**
 * Função que checka se quem enviou a mensagem tem o ID do criador, wizeshi.
 * 
 * @param {DiscordJS.ChatInputCommandInteraction} interaction A interação para checkar
 * @returns true | false
 */

export function wizeshiCheck(interaction: DiscordJS.ChatInputCommandInteraction) {
    if (interaction.user.id !== '345893068568002570') {
        interaction.reply({ content: `<@${interaction.user.id}>, não me parece que sejas o wizeshi.`, ephemeral: true})
        return
    }
}