import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { wizeshiCheck } from '../../global/funcs/wizeshicheck';
import { prompt } from '../../global/funcs/prompt';
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clonarcanal')
        .setDescription('Sê um mongoloíde e clona canais!')
        .addChannelOption(options =>
            options.setName('canalclonado')
                .setDescription('Canal a ser clonado!')
                .setRequired(true))
        .addNumberOption(options =>
            options.setName('vezesclonado')
                .setDescription('Vezes a ser clonado!')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        wizeshiCheck(interaction)

        const canalClonado = interaction.options.getChannel('canalclonado')
        const canalClonadoID = canalClonado?.id as string
        const canalClonadoCheck = interaction.guild?.channels.cache.get(`${canalClonadoID}`)
        const n = interaction.options.getNumber('vezesclonado') as number

        if (canalClonadoCheck?.type === DiscordJS.ChannelType.GuildText) {
            prompt(canalClonadoCheck, n, interaction, 1)
        } else if (canalClonadoCheck?.type === DiscordJS.ChannelType.GuildVoice) {
            prompt(canalClonadoCheck, n, interaction, 2)
        } else {
            cc.log(`O ${interaction.user.tag} tentou clonar o canal $${canalClonadoCheck?.name}, mas não é um tipo suportado.`, 'errorRed', 'error')
            interaction.reply({ content: `<@${interaction.user.id}>, não foi possível clonar o canal ${canalClonadoCheck}, porque não é um tipo de canal suportado.`, ephemeral: true})
        }
    }
}