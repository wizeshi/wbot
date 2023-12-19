import DiscordJS, { GuildResolvable, GuildVoiceChannelResolvable } from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from 'discord.js'
import { PlayerSearchResult, QueryType, Track } from "discord-player";
import playdl, { search } from "play-dl"
import { cc } from '../../global/funcs/customConsole';

playdl.setToken({
    spotify: {
        client_id: '37966717a78045eda2d4d27d9e55a703',
        client_secret: 'ea4f2a6699cb4f4aae35c91545918d56',
        market: 'PT',
        refresh_token: 'AQAcpc1YeCsycXPoQn3GZ8pVN4ERPGag4GqrpAKfqbgI0O1IlENaJXcyiCgla8226OJ0nEsU3kKREksu8XAQEdEGF7lTxkXLab7ZzNL69XjrgOSznT3ZsKYDJ9b55bGukO4'
    }
})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tocar')
        .setDescription('Toca uma música 🎶')
        .addStringOption(options => 
            options.setName('termos')
                .setDescription('Termos para pesquisar a música!')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        await interaction.deferReply()

        var check = bot.isDefaultChannel(interaction.channelId)

        if (check == false) {
            interaction.followUp({ content: 'Não podes executar comandos neste canal!', ephemeral: true })
            cc.log('A ação foi cancelada, porque quem executou não a executou no canal correto.', 'logWhite', 'info')
            return
        }

        const member = interaction.guild?.members.cache.get(interaction.member?.user.id as string)
        if (!member?.voice.channel) {
            await interaction.followUp({ content: `<@${interaction.user.id}>, não estás conectado a um canal de voz!`})
            return
        }
        
        const guildToQueue = interaction.guild as GuildResolvable

        const queue = client.player.nodes.create(guildToQueue, {
            //@ts-ignore
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube") {
                    return (await playdl.stream(track.url, {discordPlayerCompatibility : true})).stream
                }},
            selfDeaf: true,
            metadata: interaction,
            leaveOnEnd: false,
            leaveOnEmpty: false
        })

        if (!queue.connection) {
            await queue.connect(member.voice.channel)
        }

        let embed = new EmbedBuilder()

        let url = interaction.options.getString("termos") as string

        const result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        }).catch(() => { cc.log('Houve um error ao pesquisar o video/playlist, mas foi possivel apanhá-lo', 'errorRed', 'error'); console.error()}) as PlayerSearchResult

        if (result.tracks.length === 0) {
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({ content: `Nenhuma música encontrada!` })
            } else {
                await interaction.followUp({ content: `Nenhuma música encontrada!`, ephemeral: true })
            }
            return
        }

        let sp: Track | Track[]
               
        if (result.playlist) {
            sp = result.tracks
            let songData = result.playlist

            embed
                .setColor(0xb31207)
                .setDescription(`**[${songData.title}](${songData.url})** foi adicionada a fila`)
                .setThumbnail(`${songData.thumbnail}`)
                .setFooter({ text: `Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string  })
        } else {
            sp = result.tracks[0]

            embed
                .setColor(0xb31207)
                .setDescription(`**[${sp.title}${(sp?.queryType == 'spotifySearch' || sp?.queryType == 'spotifySong') ? ` - ${sp.author}`: '' }](${sp.url})** foi adicionado a fila`)
                .setThumbnail(`${sp.thumbnail}`)
                .setFooter({ text: `${sp.duration} | Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string  })
                .setTimestamp(),
        cc.log(`A música foi adicionada à fila:\n  Nome: ${sp.title}\n  URL: ${sp.url}\n  Quem adicionou: ${interaction.user.tag}`, 'logWhite', 'info')
        }


        await queue.addTrack(result.playlist ? result.tracks : result.tracks[0])

        let song = result.playlist ? result.tracks : result.tracks[0]

        let userVoice = interaction.member as DiscordJS.GuildMember
        let userVoiceChannel = userVoice.voice.channel as GuildVoiceChannelResolvable

        if (!queue?.node.isPlaying()) {
            await queue?.node.play()
        }

        await interaction.followUp({
            embeds: [embed],
        })
    }
}