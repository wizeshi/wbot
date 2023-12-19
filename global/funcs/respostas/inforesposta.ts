import DiscordJS, { EmbedBuilder } from "discord.js"
import { cc } from "../customConsole"

export async function respostainfo(interaction: DiscordJS.StringSelectMenuInteraction, client: DiscordJS.Client) {
    const selected = interaction.values[0]
    
    let botOwner = client.users.cache.get('345893068568002570')
    let botOwnerMember = interaction.guild?.members.cache.get(`${botOwner?.id}`)
    let bot = client.user
    let pelouro = client.users.cache.get(`600661477237719060`)
    let dark = client.users.cache.get(`539143701004419073`)
    let seca = interaction.guild?.members.cache.get(`365923371718017027`)
    let radicais = interaction.guild?.roles.cache.get('938878344651472967') as DiscordJS.Role

    switch (selected) {
        case 'home':
            const homeEmbed = new EmbedBuilder()
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
            await interaction.update({ embeds: [homeEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (home)`, 'logWhite', 'info')
            break;

        case 'apagarcanalinfo':
            const apagarcanalEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /apagarcanal')
                .setDescription(`O /apagarcanal é um comando que serve para apagar vários canais com o mesmo nome de uma vez.`)
                .setThumbnail(`${pelouro?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${pelouro?.id}>` },
                    { name: 'Origem', value: `Contexo era: Average day in ohio 💀, apeteceu a alguém criar trilhentos canais com o mesmo nome, portanto, como o <@${botOwner?.id}> não curtiu, fez este comando para apagar-los.`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [apagarcanalEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (apagarcanal)`, 'logWhite', 'info')
            break;

        case 'botaoinfo':
            const botaoEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /botao')
                .setDescription(`O /botao é um comando que faz aparecer uma mensagem com botões, que fazem várias coisas.`)
                .setThumbnail(`${botOwner?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${botOwner?.id}>` },
                    { name: 'Origem', value: `Desde 2021, o <@${botOwner?.id}> está a fazer este bot.\nComeçou quando o discord.js (modúlo que o bot usa) estava na versão v12.\nE então, quando quis reviver-me, já estavamos na v14.\nPortanto, não sabia nada.\nE fazer o botão foi a primeira coisa que aprendeu.\nE ainda funciona!`},
                    { name: 'Restrições', value: `Qualquer um pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [botaoEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (botao)`, 'logWhite', 'info')
            break;

        case 'cargosinfo':
            const cargosEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /cargos')
                .setDescription(`O /cargos é um comando que dá um cargo que escolheres.`)
                .setThumbnail(`${botOwner?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${botOwner?.id}>` },
                    { name: 'Origem', value: `O /cargos surgiu de quando o <@${botOwner?.id}> foi banido do servidor, então ficou putinha e não queria mais admin abuse (<@${dark?.id}> 😁), portanto fez este comando para dar-se cargos.`},
                    { name: 'Restrições', value: `Qualquer um pode usar (Lá no fundo o <@${botOwner?.id}> queria ser o único a poder).`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [cargosEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (cargos)`, 'logWhite', 'info')
            break;

        case 'clonarcanalinfo':
            const clonalCanalEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /cargos')
                .setDescription(`O /cargos é um comando que dá um cargo que escolheres.`)
                .setThumbnail(`${pelouro?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${pelouro?.id}>` },
                    { name: 'Origem', value: `Um certo dia, o <@${pelouro?.id}> e o <@${botOwner?.id}> estavam a debater sobre o porquê de os canais do server não terem sido clonados, portanto tivemos esta ideia maravilhosa.`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [clonalCanalEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (clonarcanal)`, 'logWhite', 'info')
            break;

        case 'divulgacaoinfo':
            const divulgaçãoEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /divulgação')
                .setDescription(`O /divulgação serve para divulgar uma foto a tua escolha.`)
                .setThumbnail(`${dark?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${dark?.id}>` },
                    { name: 'Origem', value: `O <@${botOwner?.id}> queria chantagiar o <@${dark?.id}> a colocar-me com mais cargos, mas como não consegiu, fez este comando que spamava o falando com uma foto sus.`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [divulgaçãoEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (divulgação)`, 'logWhite', 'info')
            break;

        case 'pingponginfo':
            const pingpongEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /pingpong')
                .setDescription(`O /pingpong é um comando de ping pong ` + '¯\_(ツ)_/¯')
                .setThumbnail(`${pelouro?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${pelouro?.id}>` },
                    { name: 'Origem', value: `Depois do <@${botOwner?.id}> fazer o botão (cria), mostrou à maltinha da pesada e o <@${pelouro?.id}> passou a call para fazer este comando, então, o <@${botOwner?.id}> como bom amigo que é, fez-lhe esse favor :).`},
                    { name: 'Restrições', value: `Qualquer um pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [pingpongEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (pingpong)`, 'logWhite', 'info')
            break;

        case 'tirarmuteinfo':
            const tirarmuteEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /tirarmute')
                .setDescription(`O /tirarmute é um comando para tirar o mute de alguém.`)
                .setThumbnail(`${botOwner?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `${radicais}` },
                    { name: 'Origem', value: `O <@${botOwner?.id}> estava a sofrer bullying de certas pessoas, portanto fez isto para tirar o mute :).`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [tirarmuteEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (tirarmute)`, 'logWhite', 'info')
            break;
        
        case 'tirarpermsinfo':
            const tirarpermsEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /tirarperms')
                .setDescription(`O /tirarperms é um comando para tirar as permissões de comandos.`)
                .setThumbnail(`${botOwner?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${botOwner?.id}>` },
                    { name: 'Origem', value: `O <@${botOwner?.id}> viu que ia haver abuso de poder de certas pessoas, e queria restringir as permissões sem mudar na consola, portanto, tentou fazer este comando.\nTentou porque ainda não conseguiu 🤷.`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [tirarpermsEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (tirarperms)`, 'logWhite', 'info')
            break;
        
        case 'wbaninfo':
            const wbanEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /wban')
                .setDescription(`O /wban é um comando para dar ban a alguém.`)
                .setThumbnail(`${botOwner?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${seca?.id}>` },
                    { name: 'Origem', value: `O <@${botOwner?.id}> estava a achar o <@${seca?.id}> muito **haha funny**, então tentou counterá-lo. Spoiler: não funcionou 😔.`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [wbanEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (wban)`, 'logWhite', 'info')
            break;
            
        case 'wunbaninfo':
            const wunbanEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /wunban')
                .setDescription(`O /wunban é um comando para tirar o ban de alguém.`)
                .setThumbnail(`${botOwner?.avatarURL()}`)
                .addFields(
                    { name: 'Sugerido por', value: `<@${seca?.id}>` },
                    { name: 'Origem', value: `O <@${botOwner?.id}> queria ver se dava de tirar ban pelas minhas DMs, portanto fez este comando para o fazer. Também não funcionou 😥`},
                    { name: 'Restrições', value: `Apenas o <@${botOwner?.id}> pode usar.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [wunbanEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (wuban)`, 'logWhite', 'info')
            break;
        
        case 'extrasinfo':
            const extrasEmbed = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle('Informação do bot - Comando - /tirarperms')
                .setDescription(`O /tirarperms é um comando para tirar as permissões de comandos.`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/1018892818976079872/1054589244640874496/image.png`)
                .addFields(
                    { name: 'wBot/music', value: `O <@${botOwner?.id}> queria fazer este bot tornar-se num bot de música, mas durante o processo mudou a linguagem da programação para TypeScript, mas a maioria dos plugins para áudio do [YouTube](https://www.youtube.com), [Spotify](https://open.spotify.com) e [SoundCloud](https://soundcloud.com) não estão disponíveis.`},
                    { name: 'Update ao wBot/music',  value: 'Já fazia algum tempo que eu não atualizava 💀, portanto tive problemas em arranjar novas cenas para fazer, logo voltei ao wBot/music.\nEntretanto, finalmente consegui. Infelizmente, fiquei tanto tempo sem o usar que ele parou de funcionar sozinho ☹️. Agora passei +13 horas a arranjar bugs por causa de atualizações automáticas. O suícidio realmente é uma solução.\n\nPS: Já dá de usar o wBot/music, e tem suporte para [YouTube](https://www.youtube.com), [Spotify](https://open.spotify.com) e qualquer outra cena acho (e também funciona com playlists (**finalmente**)).'},
                    { name: 'Projetos fora do Discord', value: `Eu, o ${client.users.cache.get('365923371718017027')} e o ${client.users.cache.get('539143701004419073')} já tentamos fazer jogos, na **[Unity Engine](https://unity.com)** e outro com um módulo do Python chamado **[Pygame](https://www.pygame.org/)**, ambos não funcionaram.\nO da Unity não funcionou já que para fazer um projeto em grupo, precisamos de pagar. O do [Pygame](https://www.pygame.org/), porque nenhum de nós percebe a síntase do Python. ` },
                    { name: 'Atualizações', value: `Recentemente, o <@${botOwner?.id}> decidiu ter derrames e acabou por criar um novo sistema por trás do bot, um "command handler/deployer".\nEste bacano faz com que basicamente os comandos não sejam re-criados e sejam só atualizados. Isto demorou 7 horas. A escrever a mesma merda 12 vezes seguidas. Estou desapontado comigo mesmo.\n Mas hey, ao menos a consola ficou bonita :/.`}
                )
                .setTimestamp()
                .setFooter({ text: 'Feito pelo wizeshi™', iconURL: `${botOwner?.avatarURL()}` })
            await interaction.update({ embeds: [extrasEmbed] })
            cc.log(`${interaction.user.tag} usou o /info (extras)`, 'logWhite', 'info')
            break;
    }
}