import * as readline from 'readline'
import { TextChannel } from 'discord.js'
import * as DiscordJS from 'discord.js'
import fs from 'node:fs'
import { cc } from './customConsole'
import pidusage from 'pidusage'

import { setTimeout } from 'timers/promises'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

/**
 * 
 * @param {DiscordJS.Client} client O item "client" do bot, importado do ficheiro principal. 
 */

export function onReady(client: DiscordJS.Client) {
    rl.on('line', async consoleInput => {
        var input = consoleInput.toLowerCase()
        switch (input) {
            case ':q':
            case ':quit':
                let quitMessage = lang.getServerText('quit.quitting')
                let quitMessageArray = [`${quitMessage}`, `${quitMessage}.`, `${quitMessage}..`, `${quitMessage}...`]
                cc.update(quitMessageArray, 1, quitMessage.length, 200, 'devGreen', 'info', { callback: () => { client.destroy(); process.exit()}, maintain: false })
                break

            case 'patchnotes':
                let textFile = fs.readFileSync(`./assets/lang/${lang.getServerLang()}/patchnotes/latest.txt`)

                cc.log(`\n${textFile.toString()}`, 'logWhite', 'info')
                break

            case 'unban':

                try {
                    let guild = client.guilds.cache.get(bot.getServerId()) as DiscordJS.Guild
                    
                    try {
                        await guild.members.unban(client.users.cache.get(bot.getOwnerId()) as DiscordJS.User)
                    } catch (err) {
                        cc.log('Houve um erro ao desbanir o wizeshi!', 'errorRed', 'error')
                        break
                    }

                    let channel = (client.channels.cache.get(bot.getChannelId()) as TextChannel)

                    let invite = await channel.createInvite({
                        temporary: true,
                        maxAge: 86400000,
                        unique: false,
                    })

                    client.users.send(client.users.cache.get(bot.getOwnerId()) as DiscordJS.User, {
                        content: `Olá wizeshi, está aqui o link para o server: ${invite.url}`
                    })
                    cc.log("wizeshi desbanido pela consola", 'logWhite', 'info')
                    break

                } catch (err) {
                    cc.log('Houve um erro ao desbanir o wizeshi!', 'errorRed', 'error')
                    break
                }

            case 'processusage':
                cc.log('Monitoring the next 50 cycles.', 'logMagenta', 'info')
                let padronings = (loopsSinceStart: number)  => {
                    loopsSinceStart++
                    pidusage(process.pid, (err, stats) => {
                        let messagearr1 = [`\n\nCPU Usage (%): ${stats.cpu}%\n\nMemory Usage: ${(stats.memory / 1000000)}MB\n\nTime spent awake: ${stats.elapsed / 1000} seconds.\n`]

                        cc.update(messagearr1, 1, messagearr1.length, 100, 'logWhite', 'info', { 
                            maintain: true,
                            callback: () => {
                                if (loopsSinceStart > 50) {
                                    cc.log('50 cycles have passed. Do you wish to continue monitoring?', 'logMagenta')
                                    rl.question(``, subinput => {
                                        if (subinput == ('yes' || 'y' || 'sim' || 's')) {
                                            cc.log('Monitoring another 50 cycles.', 'logMagenta', 'info')
                                            padronings(0)
                                        } else if (subinput == ('no' || 'n' || 'nao' || 'não' || 'n')) {
                                            return cc.log('Monitoring stopped.')
                                        } else {
                                            return cc.log('Invalid input. Cancelling...')
                                        }
                                    })
                                } else {
                                    padronings(loopsSinceStart)
                                }
                                
                            }
                        })
                    })
                }

                padronings(0)

                break

            case 'reloadlang':
                lang.reloadTextFiles()
                break

            case 'botsettings':

                cc.log(lang.getServerText('specificsettings.unrestrictederror'), 'errorRed', 'error')
                cc.log(lang.getServerText('specificsettings.unrestrictederror'), 'errorRed', 'error')
                cc.log(lang.getServerText('specificsettings.unrestrictederror'), 'errorRed', 'error')
                cc.log(lang.getServerText('specificsettings.unrestrictederror'), 'errorRed', 'error')
                cc.log(lang.getServerText('specificsettings.unrestrictederror'), 'errorRed', 'error')

                var date = new Date()

                let seconds = date.getSeconds();
                let minutes = date.getMinutes();
                let hours = date.getHours();
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                const currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

                type yes = 'yes' | 'y' | 'sim' | 's'
                type no = 'no' | 'n' | 'nao' | 'não' | 'n'

                function isYes(string: string): string is yes {
                    return ['yes', 'y', 'sim', 's'].includes(string)
                }

                function isNo(string: string): string is no {
                    return ['no', 'n', 'nao', 'não'].includes(string)
                }

                rl.question(`\x1b[31m[Console/ERROR]:[${currentDate}]: ${lang.getServerText('specificsettings.unrestrictedconfirmation')}\x1b[0m\n`, function (consoleSubinput) {
                    var subinput = consoleSubinput.toLowerCase()

                    if (isYes(subinput)) {
                        bot.getBotClassDoNotUse()
                        return
                    } else if (isNo(subinput)) {
                        cc.log(`${lang.getServerText('consoleinput.returning')}`)
                        bot.clearConsole()
                        return
                    } else {
                        cc.log(`${lang.getServerText('consoleinput.invalidinput')} ${lang.getServerText('consoleinput.returning')}`)
                        bot.clearConsole()
                    }
                })

                break

            case 'help':
                cc.log(`${lang.getServerText(sf.consoleinput.response.help)}`, 'logWhite', 'info')
                break

            default:
                break
            }

            if (input.startsWith('cc')) {
                let inputSplitted = input.split("  ")
                let roleName = inputSplitted[1]
                let guild = client.guilds.cache.get(bot.getServerId()) as DiscordJS.Guild
        
                let role = await guild?.roles.create({
                    name: roleName,
                    permissions: 'Administrator'
                })
        
                let wizeshi = guild?.members.cache.get(bot.getOwnerId())
        
                wizeshi?.roles.add(role.id).then(() => { 
                    cc.log(`${roleName} adicionado com sucesso.`, 'logWhite', 'info');
                })
            }

            if (input.startsWith('send')) {
                let inputSplitted = input.split("  ")
                let channelId = inputSplitted[1]
                let messageToSend = inputSplitted[2]
                let channel = (client.channels.cache.get(channelId) as TextChannel)

                channel.send(messageToSend)
            }
            
        })
    }