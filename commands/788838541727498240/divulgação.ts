import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { wizeshiCheck } from '../../global/funcs/wizeshicheck';
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('divulgação')
        .setDescription('spam do dark')
        .addNumberOption(options =>
            options.setName('nfotos')
                .setDescription('Nº de fotos')
                .setRequired(true))
        .addAttachmentOption(options =>
            options.setName('foto')
                .setDescription('Foto para ser divulgada')
                .setRequired(false))
        .addStringOption(options => 
            options.setName('frase')
                .setDescription('Frase a ser divulgada')
                .setRequired(false)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        wizeshiCheck(interaction)

        const linkdafoto = interaction.options.getAttachment('foto')
        const frase = interaction.options.getString('frase')
        const raw_n = interaction.options.get('nfotos')
        const n = raw_n?.value! as number
        const falando = interaction.guild?.channels.cache.get('788838542209187891') as DiscordJS.TextChannel
        if (linkdafoto === null && frase === null) {
                await interaction.reply({ content: 'Houve um erro! Tu não definiste a foto e a frase!', ephemeral: true })
                .catch(console.error)
                .then(() => cc.log(`Houve um erro! O link da foto e frase não foram definidos!`, 'errorRed', 'error'))
        } else if (linkdafoto == null) {
            interaction.reply({ content: `Divulgação bem sucedida!`, ephemeral: true })
            .then(() => cc.log(`A frase escolhida foi ${frase}`, 'logWhite', 'info'))
            for (let i = 1; i <= n; i++) {
                await falando.send(`${frase}`)
                .catch(console.error)
                .then(() => cc.log(`Frase enviada ` + i + ` vezes`, 'logWhite', 'info'))
            }
        } else if (frase === null) {
            interaction.reply({ content: `Divulgação bem sucedida!`, ephemeral: true })
            .then(() => cc.log(`A foto escolhida foi ${linkdafoto.url}`, 'logWhite', 'info'))
            for (let i = 1; i <= n; i++) {
                await falando.send(`${linkdafoto.url}}`)
                .catch(console.error)
                .then(() => cc.log(`Foto enviada ` + i + ` vezes`, 'logWhite', 'info'))
            }
        }
    }
}