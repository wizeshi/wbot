import DiscordJS, { ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, StringSelectMenuBuilder } from 'discord.js'
import { cc } from '../customConsole'

export function infoFunc(interaction: DiscordJS.ChatInputCommandInteraction) {
            let botOwner = client.users.cache.get('345893068568002570')
            let bot = client.user
            const embedinfo = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot')
                .setDescription(`Olá <@${interaction.user.id}>!`)
                .setThumbnail(`${bot?.avatarURL()}`)
                .addFields(
                    { name: 'Feito por', value: `Fui feito pelo <@${botOwner?.id}>.` },
                    { name: 'Origem', value: `O <@${botOwner?.id}> teve interesse em programação, e a primeira coisa que lhe apareceu nos Recomendados do YT foi "Como fazer um bot básico do discord em JavaScript" e teve interesse.` },
                    { name: 'Contribuições', value: `Apoio moral do ${client.users.cache.get('365923371718017027')}, do ${client.users.cache.get('539143701004419073')} e do ${client.users.cache.get('600661477237719060')}\nBullying vindo do ${client.users.cache.get('531440890401652756')} e do ${client.users.cache.get('328869144315428864')}\nE mais importantemente, do [StackOverflow](https://https://stackoverflow.com) e de [tutoriais dos indianos](https://www.youtube.com/watch?v=Y5KV0axPgog)`},
                    { name: 'Uso', value: `Tenho vários comandos disponíveis!\nVê a origem de cada um e os seus usos a selecionar em baixo 👇` },
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            cc.log(`${interaction.user.tag} usou o /info`, 'logWhite', 'info')
    
            const row1 = new ActionRowBuilder<SelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('infoselect')
                    .setPlaceholder('Comandos')
                    .addOptions(
                        {
                            label: 'Voltar à página principal',
                            value: 'home',
                        },
                        {
                            label: '/apagarcanal',
                            value: 'apagarcanalinfo',
                        },
                        {
                            label: '/botao',
                            value: 'botaoinfo',
                        },
                        {
                            label: '/cargos',
                            value: 'cargosinfo',
                        },
                        {
                            label: '/clonarcanal',
                            value: 'clonarcanalinfo',
                        },
                        {
                            label: '/divulgação',
                            value: 'divulgacaoinfo',
                        },
                        {
                            label: '/pingpong',
                            value: 'pingponginfo',
                        },
                        {
                            label: '/tirarmute',
                            value: 'tirarmuteinfo'
                        },
                        {
                            label: '/tirarperms (WIP)',
                            value: 'tirarpermsinfo',
                        },
                        {
                            label: '/wban',
                            value: 'wbaninfo',
                        },
                        {
                            label: '/wuban',
                            value: 'wunbaninfo',
                        },
                        {
                            label: 'Extras',
                            value: 'extrasinfo',
                        },
                    )
                )
    
            interaction.reply({ embeds: [embedinfo], components: [row1], ephemeral: true })
}