import DiscordJS, { EmbedBuilder, TextChannel, Collection, GatewayIntentBits, REST, Routes, ActivityType, AuditLogEvent } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { Player, Track } from 'discord-player'
import { onReady } from './global/funcs/onready'
import { respostainfo } from './global/funcs/respostas/inforesposta'
import { xmasCheck } from './global/funcs/xmasCheck'
import { wBot } from './global/settings/botSpecificSettings'
import { botLang, cfFile, gfFile, sfFile } from './global/settings/language'
import { cc } from './global/funcs/customConsole'
import rpc from '@xhayper/discord-rpc'

declare global {
    var player: Player;
    var client: DiscordJS.Client;
    var currentDir: string;
    var bot: wBot;
    var lang: botLang;
    var sf: sfFile;
    var cf: cfFile;
    var gf: gfFile;
}

global.currentDir = 'C:\\Users\\wizeshi\\Desktop\\Ambiente de Trabalho\\wBot'
global.lang = new botLang('pt-PT', 'en-US', 'pt-PT')
global.bot = new wBot()

dotenv.config()

async function getLatestVersion() {
    const url1 = "https://raw.githubusercontent.com/wizeshi/wbot/main/package.json"
    const response = await fetch(url1)
    const data = await response.text();
    const dataJSON = await JSON.parse(data)

    return dataJSON.version
}

/* console.clear() */

declare module "discord.js" {
    export interface Client {
        commands: Map<unknown, any>
    player: Player
    rpc: rpc.Client
}}

const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

const rest = new REST({ version: '10' }).setToken((process.env.TOKEN) as string);


cc.log(`${lang.getLoadingText()}`, 'devGreen', 'info')
cc.log('made by wizeshi™', 'logWhite', 'info')


interface ICommand {
    data: DiscordJS.SlashCommandBuilder,
    execute(interaction: DiscordJS.ChatInputCommandInteraction): Promise<void>
}

client.on('ready', async () => {
    global.client = client
    
    cc.log(`${lang.getServerText(sf.startup.commandloadfinished)}`, 'devGreen')
    
    cc.log('Client Online!', 'devGreen')

    // Check for client version

    let latestVersion = (await getLatestVersion() as string)

    let [mainLatestVersionStr, subLatestVersionStr, smallLatestVersionStr] = latestVersion.split(".")
    
    let mainLatestVersionInt = Number(mainLatestVersionStr) * 100; let subLatestVersionInt = Number(subLatestVersionStr) * 10; let smallLatestVersionInt = Number(smallLatestVersionStr)
    
    let sumOfLatest = mainLatestVersionInt + subLatestVersionInt + smallLatestVersionInt
    
    let currentVersion = (JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' }))).version

    let [mainCurrentVersionStr, subCurrentVersionStr, smallCurrentVersionStr] = currentVersion.split(".")
    
    let mainCurrentVersionInt = Number(mainCurrentVersionStr) * 100; let subCurrentVersionInt = Number(subCurrentVersionStr) * 10; let smallCurrentVersionInt = Number(smallCurrentVersionStr)
    
    let sumOfCurrent = mainCurrentVersionInt + subCurrentVersionInt + smallCurrentVersionInt

    if (sumOfLatest > sumOfCurrent) {
        cc.log(`Your version is outdated!\n    Latest version: ${latestVersion}\n    Current Version: ${currentVersion}\n    ${latestVersion} changelog: https://github.com/wizeshi/wbot/blob/master/assets/lang/${lang.getServerLang()}/patchnotes/${latestVersion}.md\n    Please update to ${latestVersion} ASAP, since it might include security or feature patches!`, "warningYellow", "warn")
    }

    guildCommands.forEach((values, key, map) => { let guild = client.guilds.cache.get(key); bot.uploadGuildToDatabase((guild as DiscordJS.Guild)) })
    
    client.user?.setPresence({ status: "idle", activities: [{ name: `Fortnite`, state: 'fornite é mesmo baril', type: ActivityType.Streaming, url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }] })
})

client.commands = new Map()

var commandsToClient = new Collection()

var guildCommands = new Map<string, Set<ICommand>>()
let guildCommandsCount = 0

const guildFoldersPath = path.join(__dirname, 'commands')
const guildCommandFolders = fs.readdirSync(guildFoldersPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)


for (const folder of guildCommandFolders) {
    var guildCommandsPath = path.join(guildFoldersPath, folder)
    const guildCommandFiles = fs.readdirSync(guildCommandsPath).filter(file => file.endsWith(".ts"));

    let guildName = bot.getGuildFromDatabase(folder).name

    guildCommands.set(folder, new Set())

    for (const guildCommandFile of guildCommandFiles) {
        const commandFilePath = path.join(guildCommandsPath, guildCommandFile)
        const guildCommand = require(commandFilePath)

        if (!('data' in guildCommand && 'execute' in guildCommand)) {
            cc.log(`${lang.getServerText(sf.startup.commandfailedload)} ${commandFilePath} ❌`, 'errorRed', 'error')
            console.log(guildCommand.data)
            continue
        }

        let guildCommandData = {
            data: guildCommand.data,
            execute: guildCommand.execute,
        }
        
        guildCommands.get(folder)?.add(guildCommandData); guildCommandsCount += 1

        cc.log(`${lang.getServerText(sf.startup.commandloaded)} ${guildCommand.data.name} ${lang.getServerText('startup.forguild')} ${guildName}  ✅`)
    }
}

var globalCommandsPath = path.join(__dirname, 'global/commands')
var globalCommandFiles = fs.readdirSync(globalCommandsPath).filter(file => file.endsWith('.ts'));


let globalCommandsData: Array<any> = []
let globalCommands: Array<ICommand> = []
let globalCommandsCount = 0

for (const globalCommandFile of globalCommandFiles) {
    const commandFilePath = path.join(globalCommandsPath, globalCommandFile)
    const globalCommand = require(commandFilePath)

    if (!('data' in globalCommand && 'execute' in globalCommand)) {
        cc.log(`${lang.getServerText(sf.startup.commandfailedload)} ${commandFilePath} ❌`, 'errorRed', 'error')
        console.log(globalCommand.data)
        continue
    }

    let globalCommandData = {
        data: globalCommand.data,
        execute: globalCommand.execute
    }

    globalCommands.push(globalCommandData); globalCommandsCount += 1

    cc.log(`${lang.getServerText(sf.startup.commandloaded)} ${globalCommand.data.name} ${lang.getServerText('startup.globally')}  ✅`)
}

let guildCommandSize = 0

try {
    guildCommands.forEach((guildCommandsSet, key, map) => {
        globalCommands.forEach((globalCommand, ix, arr) => {
            guildCommandsSet.add(globalCommand)
        })

        guildCommandsSet.forEach((command, val2, set) => {
            commandsToClient.set(command.data.name, command)
            guildCommandSize +=1
        })

        let guildCommandsData: Array<any> = []

        guildCommandsSet.forEach((value1, value2, set) => {
            guildCommandsData.push( value1.data.toJSON() )
        })

        client.commands.set(key, commandsToClient)

        const data = rest.put(
            Routes.applicationGuildCommands((process.env.CLIENTID as string), key),
            { body: guildCommandsData }
        )

            
    })

    let overlappingCommandCount = (guildCommandsCount + globalCommandsCount) - guildCommandSize

    let frameMessage = `A atualizar ${globalCommandsCount + guildCommandsCount - overlappingCommandCount} comandos`
    let frames = [ `${frameMessage} (/)`, `${frameMessage} (-)`, `${frameMessage} (\\)` ]
    cc.update(frames, 1, 10, 75, 'devGreen', 'info', {
        log: {
            msg: `${globalCommandsCount + guildCommandsCount - overlappingCommandCount} ${lang.getServerText(sf.startup.commandsreloaded)} ${guildCommandsCount} ${lang.getServerText(sf.startup.commandcountp1)}, ${globalCommandsCount} ${lang.getServerText(sf.startup.commandcountp2)} ${overlappingCommandCount} ${lang.getServerText(sf.startup.commandcountp3)}`,
            cor: 'devGreen'
        },
        maintain: false,
    })
} catch (err) {
    console.log(err)
}

client.player = new Player(client, {
   ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },

})

client.player.extractors.loadDefault();

onReady(client)

client.on('interactionCreate', async interaction => {
    if (interaction.isStringSelectMenu()) {
        return respostainfo(interaction, client)
    } /* else if (interaction.isButton()) {
        return respostaBotao(interaction, client)
    } */
    if (!interaction.isChatInputCommand()) {
        return
    }

    const command = interaction.client.commands.get(interaction.guildId).get(interaction.commandName)

    if (!command) {
        cc.log(`${lang.getServerText(sf.commands.nosuchcommand)} ${interaction.commandName}`, 'errorRed', 'error')
        return
    }

    try {
        let isGuild = interaction.inGuild()
        let interactionData  = interaction.options.data[0]
        let hasArguments = interaction.options.data.length > 0 ? `${lang.getServerText(sf.commands.logging.arguments)}: ${lang.getServerText(sf.commands.logging.commandname)}: ${interactionData.name.length > 0 ? interactionData.name : undefined} | ${lang.getServerText(sf.commands.logging.commandtype)}: ${interactionData.type} | ${lang.getServerText(sf.commands.logging.commandvalue)}: ${interactionData.value}` : `${lang.getServerText(sf.commands.logging.noarguments)}`

        await command.execute(interaction)

        cc.log(`${interaction.user.username} (guild: ${client.guilds.cache.get(isGuild ? (interaction.guildId as string) : interaction.channelId)}) ${lang.getServerText(sf.commands.logging.used)} ${command.data.name} ${hasArguments}`)

        xmasCheck(interaction)

    } catch (error) {
        cc.log(`${lang.getServerText(sf.commands.error)} ${interaction.commandName}`, 'errorRed', 'error')
        console.error(error)
        if (!interaction.replied) {
            await interaction.followUp({ content: lang.getClientText(cf.commands.error), ephemeral: true})
        } 
        await interaction.editReply({ content: lang.getClientText(cf.commands.error)})
    }
})

client.player.events.on('playerStart', async queue => {
    const defaultChannel = (client.channels.cache.get(bot.getChannelId()) as TextChannel)

    let currentSong = queue.currentTrack as Track

    let nextSong = ''

    if (queue.tracks.toArray().length > 1) {
        nextSong = `${queue.tracks.toArray()[0].title} - <@${queue.tracks.toArray()[0].requestedBy?.id}>`
    } else {
        nextSong = `${lang.getClientText(cf.music.emptyqueue)}`
    }

    let embed = new EmbedBuilder()
        .setColor(0xb31207)
        .setDescription(`${lang.getClientText(cf.music.nowplaying)} ${currentSong.title}${(currentSong?.queryType == 'spotifySearch' || currentSong?.queryType == 'spotifySong') ? ` - ${queue?.currentTrack?.author}`: '' }\n\nA seguir: ${nextSong}`)
        .setThumbnail(currentSong.thumbnail)
        .setTimestamp()
        .setFooter({ text: `${currentSong.duration} | ${lang.getClientText(cf.music.requestedby)} @${currentSong.requestedBy?.tag}`, iconURL: client.user?.avatarURL() as string})

    await defaultChannel.send({ embeds: [embed] })

    cc.log(`${lang.getServerText(sf.music.nowplaying)} ${currentSong.title} - ${currentSong.requestedBy?.tag}`, 'logWhite', 'info')
})

client.player.events.on('emptyQueue', async queue => {
    const defaultChannel =  (client.channels.cache.get(bot.getChannelId()) as TextChannel)

    let embed = new EmbedBuilder()
        .setColor(0xb31207)
        .setTimestamp()
        .setDescription(lang.getClientText('music.nomusicinqueue'))
        .setFooter({ text: ':)', iconURL: client.user?.avatarURL() as string })

    await defaultChannel.send({ embeds: [embed] })

    cc.log(`${lang.getServerText(sf.music.emptyqueue)}`, 'logWhite', 'info')
})

client.player.events.on('disconnect', async queue => {
    const logs = await client.guilds.cache.get(queue.channel?.guild.id as string)?.fetchAuditLogs({
        limit: 10,
        type: AuditLogEvent.MemberDisconnect,
    })

    const disconnectedLog = logs?.entries.first()

    const defaultChannel = (client.channels.cache.get(bot.getChannelId()) as TextChannel)

    console.log(disconnectedLog?.target)

    const now = new Date();
    const diff = now.getTime() - (disconnectedLog?.createdTimestamp as number)

    if (disconnectedLog?.target?.id === client.user?.id && diff > 5000) {
        let embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setTimestamp()
            .setDescription(lang.getClientText(cf.music.disconnect.kick))
            .setFooter({ text: ':(', iconURL: client.user?.avatarURL() as string })

        await defaultChannel.send({ embeds: [embed] })

        cc.log(`${lang.getServerText(sf.music.disconnect.kick)}`, 'logWhite', 'info')
    } else { 
        let embed = new EmbedBuilder()
            .setColor(0xb31207)
            .setTimestamp()
            .setDescription(lang.getClientText(cf.music.disconnect.inactive))
            .setFooter({ text: ':(', iconURL: client.user?.avatarURL() as string })

        await defaultChannel.send({ embeds: [embed] })

        cc.log(`${lang.getServerText(sf.music.disconnect.inactive)}`, 'logWhite', 'info')
    }
})

client.login(process.env.TOKEN)