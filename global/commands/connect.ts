import * as DiscordJS from 'discord.js'
import playdl from "play-dl"
import { cc } from '../../global/funcs/customConsole'

let commandName = lang.getGlobalText(gf.commands.connect.name)
let commandDesc = lang.getGlobalText(gf.commands.connect.description)
let commandOptionName = lang.getGlobalText(gf.commands.connect.options.channel.name)
let commandOptionDesc = lang.getGlobalText(gf.commands.connect.options.channel.description)

module.exports = {
    data: new DiscordJS.SlashCommandBuilder()
        .setName(commandName)
        .setDescription(commandDesc)
        .addChannelOption(option => 
            option
                .setName(commandOptionName)
                .setDescription(commandOptionDesc)
                .setRequired(false)),
    
    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        await interaction.deferReply();

        var check = bot.isDefaultChannel(interaction.channelId)

        if (!check) {
            interaction.reply({ content: 'Não podes executar comandos neste canal!' })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        const mem = interaction.guild?.members.cache.get(interaction.member?.user.id as string)

        const queueToCheck = client.player.queues.get(interaction.guildId as DiscordJS.GuildResolvable)
        if ((queueToCheck) || (!interaction.options.getChannel(lang.getGlobalText(gf.commands.connect.options.channel.name)) && !mem?.voice.channel)) { await interaction.editReply({ content: 'Não escolheste nenhum canal ou já estou conectado!' }); return }

        let channelToConnect = (interaction.options.getChannel(lang.getGlobalText(gf.commands.connect.options.channel.name)) as DiscordJS.VoiceBasedChannel) || mem?.voice.channel

        const guildToQueue = interaction.guild as DiscordJS.GuildResolvable

        const queue = client.player.nodes.create(guildToQueue, {
            //@ts-ignore
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube") {
                    return (await playdl.stream(track.url, {discordPlayerCompatibility : true})).stream
                }},
            selfDeaf: true,
            metadata: {
                channel: interaction.channel,
                client: interaction.guild?.members.me,
                requestedBy: interaction.user,
            },
            leaveOnEnd: false,
            leaveOnEmpty: false
        })

        queue.connect(channelToConnect)

        await interaction.editReply({content: `Conectado ao canal <#${channelToConnect.id}>`})
        
    }
}