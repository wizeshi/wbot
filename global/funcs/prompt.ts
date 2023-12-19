import DiscordJS, { BaseChannel, BaseGuildTextChannel, BaseGuildVoiceChannel } from 'discord.js'
import { cc } from '../../global/funcs/customConsole'


export async function prompt(canalClonadoCheck: BaseChannel, n: number, interaction: DiscordJS.ChatInputCommandInteraction, value: number) {
    switch (value) {
        case 1:
            for (let i = 1; i <= n; i++) {
                await (canalClonadoCheck as BaseGuildTextChannel).clone()
                .catch(console.error)
                .then(() => cc.log(`Canal clonado ` + i + ` vezes`, 'logWhite', 'info'))
            }
            interaction.reply({ content: `<@${interaction.user.id}>, ${canalClonadoCheck} clonado ${n} vezes.`, ephemeral: true})

        case 2:
            for (let i = 1; i <= n; i++) {
                await (canalClonadoCheck as BaseGuildVoiceChannel).clone()
                .catch(console.error)
                .then(() => cc.log(`Canal clonado ` + i + ` vezes`, 'logWhite', 'info'))
            }
            interaction.reply({ content: `<@${interaction.user.id}>, ${canalClonadoCheck} clonado ${n} vezes.`, ephemeral: true})
    }
}