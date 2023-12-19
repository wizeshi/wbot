import DiscordJS from 'discord.js'
import { SlashCommandBuilder } from "discord.js"
import { setTimeout } from 'timers/promises'
import { cc } from '../../global/funcs/customConsole'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tirarmute')
        .setDescription('Tira o mute! 🎙️')
        .addUserOption(options => 
            options.setName('mutepessoa')
                .setDescription('Pessoa a tirar o mute! 🎙️🚫')
                .setRequired(false)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        const tirarMutePessoa = interaction.options.getUser('mutepessoa') || interaction.user
        const tirarMuteMember = interaction.guild?.members.cache.get(tirarMutePessoa.id)
        const tirarMuteVC = tirarMuteMember?.voice.channel
        const loopMuteN = 100
        const timeoutTime = 250

        if (tirarMuteMember?.id === interaction.user.id) {
            interaction.reply({content: `Okay, <@${tirarMuteMember.id}>, tirei-te mute!`, ephemeral: true})
            cc.log(`O ${tirarMuteMember.user.tag} pediu para tirar mute a si próprio.`, 'logWhite', 'info')
        } else {
            interaction.reply({content: `Okay, <@${interaction.user.id}>, tirei mute ao <@${tirarMuteMember?.id}>!`, ephemeral: true})
            cc.log(`O ${interaction.user.tag} pediu para tirar mute ao ${tirarMuteMember?.user.tag}.`, 'logWhite', 'info')
        }
        
        for (let i = 1; i <= loopMuteN; i++) {
            if (tirarMuteMember?.voice.mute == true) {
                await setTimeout(timeoutTime)
                await tirarMuteMember.voice.setMute(false, "Este bacano usou o bot! 🚫🎙️")
                .catch(console.error)
                .then(() => cc.log(`Consegui tirar o mute do ${tirarMuteMember.user.tag}! 🎙️`, 'logWhite', 'info'))
            } else {
                await setTimeout(timeoutTime)
                await cc.log(`O ${tirarMuteMember?.user.tag} não está mute! 🎙️`, 'errorRed', 'error')
            }

            if (i == loopMuteN) {
                cc.log(`Acabei de tirar o mute!`, 'logWhite', 'info')
            }
        }
    }
}