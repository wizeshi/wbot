import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js";
import { wizeshiCheck } from '../../global/funcs/wizeshicheck';
import { setTimeout } from 'timers/promises'
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pingpong')
        .setDescription('Ping Pong! 🏓')
        .addUserOption(options =>
            options.setName('target')
                .setDescription('Escolhe uma pessoa para usar o 🏓!')
                .setRequired(true))
        .addNumberOption(options => 
            options.setName('number')
                .setDescription('O número de vezes que queres fazer Ping Pong! 🏓')
                .setRequired(true))
        .addChannelOption(options =>
            options.setName('voice1')
                .setDescription('O canal nº1 do ping pong 🏓')
                .setRequired(true))
        .addChannelOption(options =>
            options.setName('voice2')
                .setDescription('O canal nº2 do ping pong 🏓')
                .setRequired(true)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        wizeshiCheck(interaction)

        let options = interaction.options 

        const voicec1 = interaction.options.getChannel('voice1')
        const voicec2 = interaction.options.getChannel('voice2')
        const guild = client.guilds.cache.get('788838541727498240')
        const guildchannel = guild?.channels.cache.get('788838542209187891') as DiscordJS.TextChannel
        const timeoutTime = 1000
        const raw_n = options.get('number')
        const n = raw_n?.value! as number
        cc.log(`${n}`, 'logWhite', 'info')
        const target = options.getUser('target')
        const targetid = target?.id
        const member = interaction.guild?.members.cache.get(targetid!)
        const canalInicialId = member?.voice.channelId
        var pararCancelar = '0'
        var mensagem1 = '0'
        const voicecheckc1 = interaction.guild?.channels.cache.get(`${voicec1?.id}`)
        const voicecheckc2 = interaction.guild?.channels.cache.get(`${voicec2?.id}`)

        if (!member?.voice.channel) {
            interaction.reply({ content: `<@${interaction.member?.user.id}>, o ${target} não está em nenhum canal de voz! ❌`, ephemeral: true })
            .then(() => cc.log(`O @${interaction.user.tag} tentou usar o comando, mas o @${target?.tag} não estava em um canal de voz.`, 'errorRed', 'error'))
            .catch(console.error)
            return
        }

        if (voicecheckc1?.type !== DiscordJS.ChannelType.GuildVoice && voicecheckc2?.type !== DiscordJS.ChannelType.GuildVoice) {
            interaction.reply({ content: `Os canais ${voicec1?.name} e ${voicec2?.name} não é um canal de voz.`, ephemeral: true})
            cc.log(`O ${interaction.user.tag} tentou fazer ping pong, mas os ${voicec1?.name} e ${voicec2?.name} não são canais de voz.`, 'errorRed', 'error')
            return
        }

        if (voicecheckc1?.type !== DiscordJS.ChannelType.GuildVoice) {
            interaction.reply({ content: `O canal ${voicec1?.name} não é um canal de voz.`, ephemeral: true})
            cc.log(`O ${interaction.user.tag} tentou fazer ping pong, mas o ${voicec1?.name} não é um canal de voz.`, 'errorRed', 'error')
            return
        }

        if (voicecheckc2?.type !== DiscordJS.ChannelType.GuildVoice) {
            interaction.reply({ content: `O canal ${voicec2?.name} não é um canal de voz.`, ephemeral: true})
            cc.log(`O ${interaction.user.tag} tentou fazer ping pong, mas o ${voicec2?.name} não é um canal de voz.`, 'errorRed', 'error')
            return
        }

        if (interaction.member?.user.id !== targetid) {
            interaction.reply({ content: `A pedido do <@${interaction.user.id}>, o ${target} sofreu Ping Pong 🏓`, ephemeral: true })
                .then(() => cc.log(`A pedido do @${interaction.user.tag}, o @${target?.tag} levou ping pong.`, 'logWhite', 'info'))
                guildchannel.send(`<@${targetid}>, queres cancelar?`)
                mensagem1 = '1'
        } else if (interaction.member?.user.id == targetid) {
            interaction.reply({ content: `A pedido de si mesmo, o ${target} sofreu Ping Pong 🏓`, ephemeral: true })
                .then(() => cc.log(`A pedido de si mesmo, o @${target?.username} levou ping pong.`, 'logWhite', 'info'))
                guildchannel.send(`<@${targetid}>, queres cancelar?`)
                mensagem1 = '1'
        }

        /* if (mensagem1 == '1') {client.on('messageCreate', message => {
            if (message.content == 'cancelar' && message.author.id == `${targetid}`) {
                message.reply(`Ping Pong do ${target} cancelado!`)
                pararCancelar = '1'
            }
        }
        )
    } */

        for (let i = 1; i <= n; i++) {
            await member?.voice.setChannel(`${voicec1?.id}`) 
            .catch(console.error)
            .then(() => cc.log(`${target?.tag} movido ` + i + ` vezes.`, 'logWhite', 'info'))
            await setTimeout(timeoutTime)
            await i++
            await member?.voice.setChannel(`${voicec2?.id}`)
            .catch(console.error)
            .then(() => cc.log(`${target?.tag} movido ` + i + ` vezes.`, 'logWhite', 'info'))
            await setTimeout(timeoutTime)
            if (i == n) {
                member?.voice.setChannel(`${canalInicialId}`)
                .then(() => cc.log('Ping Pong acabou.', 'logWhite', 'info'))
            
            }
            
            if (pararCancelar == '1') {
                i = n
                pararCancelar = '0'
                member.voice.setChannel(`${canalInicialId}`)
                .then(() => cc.log('Ping Pong cancelado.', 'warningYellow', 'warn'))
            }

            if (!member.voice.channel) {
                cc.log(`${target?.tag} saiu/não está no canal de voz.`, 'warningYellow', 'warn')
            }
        }
    }
}