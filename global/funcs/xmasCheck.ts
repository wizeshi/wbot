import { ChatInputCommandInteraction } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

/**
 * Funcão que verifica se o dia atual é natal (por enquanto não funciona :( (foi feita 10 minutos antes do natal bro ;-;))
 * 
 * @returns true | false (booleans)
 */

export function xmasCheck(interaction: ChatInputCommandInteraction) {
    var date = new Date()

    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var isXmas = false

    if (day == 25 && month == 12) {
        cc.log(`${lang.getServerText(sf.special.xmas.happy)}, ${bot.getDevName()}`, 'logWhite', 'info')
        isXmas = true

        if (interaction.deferred || interaction.replied) {
            interaction.followUp({ content: `${lang.getClientText(cf.special.xmas.happyxmas)}, <@${interaction.user.id}>! 🎄❄️`, ephemeral: true })
        }
    }
}