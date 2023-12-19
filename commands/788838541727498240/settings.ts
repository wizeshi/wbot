import DiscordJS, { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('definições')
        .setDescription('Definições do bot!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('canal')
                .setDescription('O canal em que o bot funciona.')
                .addChannelOption(options =>
                    options
                        .setName('canal')
                        .setDescription('O canal')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('pularquandoshuffle')
                .setDescription('Pular a música atual quando acontece um shuffle.')
                .addBooleanOption(options =>
                    options
                        .setName('trueorfalse')
                        .setDescription('True or false')
                        .setRequired(true))),
    
    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.options.getSubcommand() === "canal") {
            let canal = interaction.options.getChannel('canal')

            let canalid = canal?.id as string

            bot.changeDefaultChannel(canalid)

            interaction.reply({ content: `${lang.getClientText('settings.channelchanged')}`, ephemeral: true })

            cc.log(`${lang.getServerText('settings.channelchanged')}`, 'logWhite', 'info')
        }

        if (interaction.options.getSubcommand() === "pularquandoshuffle") {
            let trueorfalse = interaction.options.getBoolean('trueorfalse') as boolean

            bot.updateSkipWhenShuffled(trueorfalse)
            
            interaction.reply({ content: `${lang.getClientText('settings.optionchanged')}`, ephemeral: true, })

            cc.log(`${lang.getServerText('settings.skipwhenshuffledchanged')}`)
        }
    }
}