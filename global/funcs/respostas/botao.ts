/* import DiscordJS from 'discord.js'
import { cc } from '../../global/funcs/customConsole'

export function respostaBotao(interaction: DiscordJS.ButtonInteraction, client: DiscordJS.Client) {
    switch (interaction.customId) {
        case 'primary':
            let wizeshiId = '345893068568002570'
            let wizeshiRole = interaction.guild?.members.cache.get(`${wizeshiId}`)
            if (wizeshiRole?.roles.cache.has('1012488616108367963')) {
                interaction.reply({ content: `O <@${wizeshiId}> já tem o cargo!`, ephemeral: true})
                    .then(user => cc.log(`O ${wizeshiRole?.user.tag} já tem o cargo! (botão)`, 'errorRed', 'error'))
            } else {
                let role = interaction.guild?.roles.cache.find(role => role.name === 'Menstruação anal')
                if (role) interaction.guild?.members.cache.get(`${wizeshiId}`)?.roles.add(role)
                    .then(user => cc.log(`Cargos para o ${wizeshiRole?.user.tag} (botão)`, 'logWhite', 'info'))
                    .catch(console.error)
                interaction.reply({ content: `Okay, cargos para o <@${wizeshiId}>! ✅`, ephemeral: true})
            }
            break;
            
        case 'secondary':
            let guild = client.guilds.cache.get('788838541727498240')
            guild?.members.unban('345893068568002570')
                .then(user => cc.log('wizeshi desbanido (botão)', 'logWhite', 'info'))
                .catch(console.error)
            interaction.reply({ content: `Okay, o <@345893068568002570> foi desbanido! ✅`, ephemeral: true})
            client.users.send('345893068568002570', 'Está aqui o link de convite do discord! https://discord.gg/bKDSk9UWk2')
            break;
            
        case 'terciary':
            if (interaction.member?.user.id == '539143701004419073') {
                return
            }





            joinVoiceChannel({
                channelId: '1035264815817560094',
                guildId: '788838541727498240',
                adapterCreator: guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
            });
            interaction.reply({ content: `Entrei na chamada 🤙`, ephemeral: true })
            .then(user => cc.log('entrei na chamada (botão)', 'logWhite', 'info'))
            break;
    }
} */