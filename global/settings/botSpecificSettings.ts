import { stringToBoolean } from "../funcs/misc/stringToBoolean"
import { Guild, TextChannel, User } from "discord.js"

import fs from 'node:fs'
import { cc } from "../funcs/customConsole"

var settingsRaw = fs.readFileSync(`${__dirname}/settings.json`, 'utf-8')
var settingsFile = JSON.parse(settingsRaw)
var devInfoRaw = fs.readFileSync(`${__dirname}/devInfo.json`, 'utf-8')
var devInfoFile = JSON.parse(devInfoRaw)
var dataRaw = fs.readFileSync(`${__dirname}/../../assets/data/guilds.json`, 'utf-8')
var dataFile = JSON.parse(dataRaw)

export class wBot {
    private botPath = 'C:\\Users\\wizeshi\\Desktop\\Ambiente de Trabalho\\wBot'
    private serverId: string = settingsFile.server
    private channelId: string = settingsFile.channel
    private ownerId: string = devInfoFile.devDiscordId
    private authorName: string = devInfoFile.author
    private devName: string = devInfoFile.dev
    private skipWhenShuffled = (stringToBoolean(settingsFile.skipWhenShuffled) as boolean)
    private botCurrentVersion = '0.22.2'


    public clearConsole = () => {
        let clearingConsoleMsg = lang.getServerText(sf.consoleinput.clearingconsole)
        let clearConsoleMsgArr = [`${clearingConsoleMsg}`, `${clearingConsoleMsg}.`, `${clearingConsoleMsg}..`, `${clearingConsoleMsg}...`] 
        cc.update(clearConsoleMsgArr, 1, clearConsoleMsgArr.length, 200, 'devGreen', 'info', { log: { msg: `${lang.getServerText(sf.consoleinput.consolecleared)}`, cor: 'devGreen', tipo: 'info'}})
        
        setTimeout(() => {
            console.clear()
        }, 1000)
    }

    /**
     * Do NOT use this, anywhere. It gives access to unrestricted access to the bot's internal functions.
     * Only use when debugging. It will also throw 5 error messages and a confirmation prompt when used (in the console.)
     */

    public getBotClassDoNotUse = () => {   
        return console.log(this)
    }

    public getBotPath = () => {
        return this.botPath
    }

    public getServerId = () => {
        return this.serverId;
    }

    public getChannelId = () => {
        return this.channelId;
    }

    public isDefaultChannel(channelID: string) {
        if (channelID == this.channelId) {
            return true
        } else {
            return false
        }
    }

    public changeDefaultChannel(channelID: string) {
        this.channelId = channelID

        settingsFile.channel = channelID

        fs.writeFileSync(`${__dirname}/settings.json`, JSON.stringify(settingsFile, null, 2))
    }

    /**
     * This function creates / overwrites the JSON key with the inputted guildId with a new one.
     * @param guild Guild to upload
     */

    public uploadGuildToDatabase(guild: Guild): void {
        dataFile[guild.id] = guild

        fs.writeFileSync(`${__dirname}/../../assets/data/guilds.json`, JSON.stringify(dataFile, null, 2))
    }

    /**
     * This function gets the JSON key with the inputted name, and returns the Guild associated with it.
     * If it can't, it will just return the original value.
     * @param guildId The guild's id
     * @returns The corresponding guild
     */

    public getGuildFromDatabase(guildId: string): Guild | { name: string } {
        if (dataFile.hasOwnProperty(guildId)) {
            let toReturn = dataFile[guildId]

            return toReturn as Guild
        } else {
            let guild = {
                name: guildId
            }
            return guild
        }
    }

    public getOwnerId = () => {
        return this.ownerId
    }

    public getAuthorName = () => {
        return this.authorName
    }

    public getDevName = () => {
        return this.devName
    }

    public shouldSkipWhenShuffled = () => {
        return this.skipWhenShuffled
    }

    public updateSkipWhenShuffled(newOpt: boolean) {
        this.skipWhenShuffled = newOpt

        settingsFile.skipWhenShuffled = newOpt

        fs.writeFileSync(`${__dirname}/settings.json`, JSON.stringify(settingsFile, null, 2))
    }
}