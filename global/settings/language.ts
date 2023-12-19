import * as fs from 'node:fs'
import { cc } from '../funcs/customConsole'

export class botLang {
    protected botClientLang: lang
    protected botServerLang: lang
    protected botGlobalLang: lang
    protected serverTextFile: string[] = []
    protected clientTextFile: string[] = []
    protected globalTextFile: string[] = []

    /**
     * constructor, parse an available language (only 2 rn) 
     * 
     * @param clientSideLang language for the end users AKA the language the guild users will see
     * @param serverSideLang language the console output will be in
     * @param globalLang language command names and other things will be in
     */

    constructor(clientSideLang: lang, serverSideLang: lang, globalLang: lang) {
        this.botClientLang = clientSideLang
        this.botServerLang = serverSideLang
        this.botGlobalLang = globalLang

        let clientLangTextFile = fs.readFileSync(`./assets/lang/${this.botClientLang}/${this.botClientLang}.txt`, {
            encoding: 'utf-8'
        })

        let serverLangTextFile = fs.readFileSync(`./assets/lang/${this.botServerLang}/${this.botServerLang}.txt`, {
            encoding: 'utf-8'
        })

        let globalLangTextFile = fs.readFileSync(`./assets/lang/${this.botGlobalLang}/${this.botGlobalLang}.txt`, {
            encoding: 'utf-8'
        })

        clientLangTextFile.split('-*/*-').forEach((string, index, array) => {
            if (string.includes('bot.server') || string.includes('bot.global')) return
            string.replace('-*/*-', "")
            this.clientTextFile.push(string)
        })

        serverLangTextFile.split('-*/*-').forEach((string, index, array) => {
            if (string.includes('bot.client') || string.includes('bot.global')) return
            string.replace('-*/*-', "")
            this.serverTextFile.push(string)
        })

        globalLangTextFile.split('-*/*-').forEach((string, index, array) => {
            if (string.includes('bot.server') || string.includes('bot.client')) return
            string.replace('-*/*-', "")
            this.globalTextFile.push(string)
        })
    }

    public getClientLang = () => {
        return this.botClientLang
    }

    public getServerLang = () => {
        return this.botServerLang
    }

    public getGlobalLang = () => {
        return this.botGlobalLang
    }

    public reloadTextFiles() {
        this.clientTextFile = []

        this.serverTextFile = []

        this.globalTextFile = []

        let clientLangTextFile = fs.readFileSync(`./assets/lang/${this.botClientLang}/${this.botClientLang}.txt`, {
            encoding: 'utf-8'
        })

        let serverLangTextFile = fs.readFileSync(`./assets/lang/${this.botServerLang}/${this.botServerLang}.txt`, {
            encoding: 'utf-8'
        })

        let globalLangTextFile = fs.readFileSync(`./assets/lang/${this.botGlobalLang}/${this.botGlobalLang}.txt`, {
            encoding: 'utf-8'
        })

        clientLangTextFile.split('-*/*-').forEach((string, index, array) => {
            if (string.includes('bot.server') || string.includes('bot.global')) return
            if (array.findIndex(name => name.includes(string)) < 0) return 

            string.replace('-*/*-', "")
            this.clientTextFile.push(string)
        })

        serverLangTextFile.split('-*/*-').forEach((string, index, array) => {
            if (string.includes('bot.client') || string.includes('bot.global')) return
            if (array.findIndex(name => name.includes(string)) < 0) return 

            string.replace('-*/*-', "")
            this.serverTextFile.push(string)
        })

        globalLangTextFile.split('-*/*-').forEach((string, index, array) => {
            if (string.includes('bot.client') || string.includes('bot.server')) return
            if (array.findIndex(name => name.includes(string)) < 0) return 

            string.replace('-*/*-', "")
            this.globalTextFile.push(string)
        })

        return cc.log(this.getServerText(sf.language.filesreloaded), 'devGreen')
    }

    public getLoadingText() {
        let loadingTextFile = fs.readFileSync(`./assets/lang/${this.botServerLang}/load.txt`, {
            encoding: 'utf-8'
        })
        
        let loadingTexts: Array<string> = []

        let randomTextNum = Math.floor(Math.random() * 19)
        
        loadingTextFile.split('\r\n').forEach((string, index, array) => {
            if (!(string.includes(' ig?'))) {
                loadingTexts.push(`${string}`)
            }

            return
        })
        
        let textToLoad = loadingTextFile.split('\r\n')[randomTextNum]

        return textToLoad
    }

    /**
     * 
     * @param getLangfor the language string name 
     * @returns the text for the current client side language
     */

    public getClientText(getLangfor: string) {
        let langIndex = this.clientTextFile.findIndex(element => element.includes(`bot.client.${getLangfor}`))

        if (langIndex >= 0) {
            return this.clientTextFile[langIndex].split('===')[1]
        } else {
            return getLangfor
        }
    }

    /**
     * 
     * @param getLangfor the language string name 
     * @returns the text for the current server side language
     */

    public getServerText(getLangfor: string) {
        let langIndex = this.serverTextFile.findIndex(element => element.includes(`bot.server.${getLangfor}`))

        if (langIndex >= 0) {
            return this.serverTextFile[langIndex].split('===')[1]
        } else {
            return getLangfor
        }
    }

    public getGlobalText(getLangfor: string) {
        let langIndex = this.globalTextFile.findIndex(element => element.includes(`bot.global.${getLangfor}`))

        if (langIndex >= 0) {
            return this.globalTextFile[langIndex].split('===')[1]
        } else {
            return getLangfor
        }
    }
}

global.cf = {
    commands: {
        error: 'commands.error',
        patchnotes: {
            description: 'commands.patchnotes.description',
            title: 'commands.patchnotes.title'
        }
    },
    settings: {
        channelchanged: 'settings.channelchanged',
        optionchanged: 'settings.optionchanged',
    },
    music: {
        nowplaying: 'music.nowplaying',
        nextsong: 'music.nextsong',
        nomusicinqueue: 'music.nomusicinqueue',
        emptyqueue: 'music.emptyqueue',
        requestedby: 'music.requestedby',
        disconnect: {
            kick: 'music.disconnect.kick',
            inactive: 'music.disconnect.inactive'
        }
    },
    special: {
        xmas: {
            happyxmas: 'special.xmas.happyxmas'
        }
    }
}

export interface cfFile {
    commands: {
        error: 'commands.error',
        patchnotes: {
            description: 'commands.patchnotes.description',
            title: 'commands.patchnotes.title'
        }
    },
    settings: {
        channelchanged: 'settings.channelchanged',
        optionchanged: 'settings.optionchanged',
    },
    music: {
        nowplaying: 'music.nowplaying',
        nextsong: 'music.nextsong',
        nomusicinqueue: 'music.nomusicinqueue',
        emptyqueue: 'music.emptyqueue',
        requestedby: 'music.requestedby',
        disconnect: {
            kick: 'music.disconnect.kick',
            inactive: 'music.disconnect.inactive'
        }
    },
    special: {
        xmas: {
            happyxmas: 'special.xmas.happyxmas'
        }
    }
}

global.sf = {
    consoleinput: {
        notvalidinput: 'consoleinput.notvalidinput',
        returning: 'consoleinput.returning',
        clearingconsole: 'consoleinput.clearingconsole',
        consolecleared: 'consoleinput.consolecleared',
        response: {
            help: 'consoleinput.response.help'
        }
    },
    language: {
        filesreloaded: 'language.filesreloaded'
    },
    specificsettings: {
        unrestrictedconfirmation: 'specificsettings.unrestrictedconfirmation',
        unrestrictederror: 'specificsettings.unrestrictederror',
    },
    commands: {
        nosuchcommand: 'commands.nosuchcommand',
        error: 'commands.error',
        logging: {
            used: 'commands.logging.used',
            arguments: 'commands.logging.arguments',
            noarguments: 'commands.logging.noarguments',
            commandname: 'commands.logging.commandname',
            commandtype: 'commands.logging.commandtype',
            commandvalue: 'commands.logging.commandvalue',
        }
    },
    startup: {
        commandloadfinished: 'startup.commandloadfinished',
        commandloaded: 'startup.commandloaded',
        forguild: 'startup.forguild',
        globally: 'startup.globally',
        commandsreloaded: 'startup.commandsreloaded',
        commandcountp1: 'startup.commandcountp1',
        commandcountp2: 'startup.commandcountp2',
        commandcountp3: 'startup.commandcountp3',
        commandfailedload: 'startup.commandfailedload'
    },
    quit: {
        quitting: 'quit.quitting'
    },
    settings: {
        channelChanged: 'settings.channelchanged',
        skipwhenshuffledchanged: 'settings.skipwhenshuffledchanged',
    },
    music: {
        nowplaying: 'music.nowplaying',
        emptyqueue: 'music.emptyqueue',
        disconnect: {
            kick: 'music.disconnect.kick',
            inactive: 'music.disconnect.inactive'
        },
    },
    special: {
        xmas: {
            happy: 'special.xmas.happy'
        },
    },
    roles: {
        tried: 'roles.tried',
        failed: {
            alreadyhas: 'roles.failed.alreadyhas'
        }
    },
}

export interface sfFile {
    consoleinput: {
        notvalidinput: 'consoleinput.notvalidinput',
        returning: 'consoleinput.returning',
        clearingconsole: 'consoleinput.clearingconsole',
        consolecleared: 'consoleinput.consolecleared',
        response: {
            help: 'consoleinput.response.help'
        }
    },
    language: {
        filesreloaded: 'language.filesreloaded'
    },
    specificsettings: {
        unrestrictedconfirmation: 'specificsettings.unrestrictedconfirmation',
        unrestrictederror: 'specificsettings.unrestrictederror',
    },
    commands: {
        nosuchcommand: 'commands.nosuchcommand',
        error: 'commands.error',
        logging: {
            used: 'commands.logging.used',
            arguments: 'commands.logging.arguments',
            noarguments: 'commands.logging.noarguments',
            commandname: 'commands.logging.commandname',
            commandtype: 'commands.logging.commandtype',
            commandvalue: 'commands.logging.commandvalue',
        }
    },
    startup: {
        commandloadfinished: 'startup.commandloadfinished',
        commandloaded: 'startup.commandloaded',
        forguild: 'startup.forguild',
        globally: 'startup.globally',
        commandsreloaded: 'startup.commandsreloaded',
        commandcountp1: 'startup.commandcountp1',
        commandcountp2: 'startup.commandcountp2',
        commandcountp3: 'startup.commandcountp3',
        commandfailedload: 'startup.commandfailedload'
    },
    quit: {
        quitting: 'quit.quitting'
    },
    settings: {
        channelChanged: 'settings.channelchanged',
        skipwhenshuffledchanged: 'settings.skipwhenshuffledchanged',
    },
    music: {
        nowplaying: 'music.nowplaying',
        emptyqueue: 'music.emptyqueue',
        disconnect: {
            kick: 'music.disconnect.kick',
            inactive: 'music.disconnect.inactive'
        },
    },
    special: {
        xmas: {
            happy: 'special.xmas.happy'
        },
    },
    roles: {
        tried: 'roles.tried',
        failed: {
            alreadyhas: 'roles.failed.alreadyhas'
        }
    },
}

global.gf = {
    commands: {
        connect: {
            name: 'commands.connect.name',
            description: 'commands.connect.description',
            options: {
                channel: {
                    name: 'commands.connect.options.channel.name',
                    description: 'commands.connect.options.channel.description',
                }
            },
        }
    }
}

export interface gfFile {
    commands: {
        connect: {
            name: 'commands.connect.name',
            description: 'commands.connect.description',
            options: {
                channel: {
                    name: 'commands.connect.options.channel.name',
                    description: 'commands.connect.options.channel.description',
                }
            },
        }
    }
}

/**
 * type for the language accessor
 * only language.ts can access
 */

type lang = 'en-US' | 'pt-PT'