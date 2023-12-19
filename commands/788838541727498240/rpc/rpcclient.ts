/* import pidusage from "pidusage";
import DiscordJS, { AttachmentBuilder } from 'discord.js'
import { Track, TrackSource } from "discord-player";
import rpc, { SetActivity } from '@xhayper/discord-rpc'

enum ECurrentActivity {
    Idling = 'IDLING',
    Playing = 'PLAYING',
    Debugging = 'DEBUGGING'
}

interface IBaseActivityOptions {
    details: string
    startTimestamp: number
}

interface IDebuggingActivityOptions extends IBaseActivityOptions {}
interface IIdlingActivityOptions extends IBaseActivityOptions {}

interface IPlayingActivityOptions extends IBaseActivityOptions {
    songName: string,
    authorName: string,
    source: TrackSource
}

interface IActivityOptions {
    music?: {
        isMusic: boolean,
        music: IPlayingActivityOptions
    },
    debugging?: {
        isDebug: boolean,
        debug?: IDebuggingActivityOptions
    },
    idling?: {
        isIdle: boolean,
        idle?: IIdlingActivityOptions
    }
}


//RPC Client Initializor

export class RPCClientClass {
    private clientId: string | undefined = ''
    private botStartTimestamp: number = 0
    public currentActivity = ''

    constructor(client: DiscordJS.Client) {
        this.clientId = client.user?.id

        pidusage(process.pid, (err, stats) => {
            this.botStartTimestamp = stats.timestamp
        })
    }

    public getImageForSource(Source: TrackSource) {
        let filePath = '../../assets/images/rpc/'
        let fileSource = ""

        switch (Source) {
            case "spotify":
                filePath += "spotify.png"
                fileSource += "spotify.png"
            case "youtube":
                filePath += "youtube.png"
                fileSource += "youtube.png"
            case "apple_music":
            case "arbitrary":
            case "soundcloud":
                filePath += "unknown.png"
                fileSource += "unknown.png"
        }

        let fileDiscordSource = new AttachmentBuilder(filePath)

        return fileSource
    }

    public makeActivity(activityOptions: IActivityOptions): SetActivity {
        var ActivityToReturn: SetActivity = {}

        switch (true) {
            case activityOptions.music?.isMusic:
                let music = activityOptions.music?.music as IPlayingActivityOptions

                ActivityToReturn.details = `${music.songName} - ${music.authorName}`
                ActivityToReturn.largeImageKey = `attachment://${this.getImageForSource(music.source)}`
                break
            case activityOptions.idling?.isIdle:
                let idle = activityOptions.idling?.idle as IIdlingActivityOptions

                ActivityToReturn.details = `Idling 😴`
                break
            case activityOptions.debugging?.isDebug:
                let debugging = activityOptions.debugging?.debug as IDebuggingActivityOptions

                ActivityToReturn.details = `Debugging...`
                break
        }

        ActivityToReturn.startTimestamp = this.botStartTimestamp

        return ActivityToReturn
    }

    public setClientActivity(newActivity: SetActivity) {
        client.rpc.user?.setActivity(newActivity)
    }
} */