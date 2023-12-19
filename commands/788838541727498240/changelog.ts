import DiscordJS, { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import fs from 'node:fs'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelog')
        .setDescription(lang.getClientText('commands.patchnotes.description')),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        let markdownFile = fs.readFileSync(`./assets/lang/${lang.getClientLang()}/patchnotes/latest.md`, { encoding: 'utf-8'})
        let textFile = markdownFile.replace("#### ", "### ")
        console.log(textFile)

        let embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setTitle(lang.getClientText('commands.patchnotes.title'))
            .setDescription(textFile.toString())

        interaction.reply({ embeds: [embed], ephemeral: true})
    }
}