/* import rpc, { SetActivity } from '@xhayper/discord-rpc'

enum ECurrentActivityType {
    Idling = 'IDLING',
    Playing = 'PLAYING',
    Debugging = 'DEBUGGING'
}

enum EActivitySongSource {
    Youtube = "YOUTUBE",
    Spotify = "SPOTIFY",
    Auto = "AUTO",
}

interface IBaseActivityDetails {
    ActivityType: ECurrentActivityType,
    details: string,
    StartTimestamp: number,
}

interface IPlayingActivityDetails extends IBaseActivityDetails {
    authorName: string,
    songName: string,
    source: EActivitySongSource,
}

export const activity = async (
    previousActivity: SetActivity = {},
    customState: IBaseActivityDetails,
): Promise<SetActivity> => {
    const presence = previousActivity;

    var state = customState

    switch (customState.ActivityType) {
        case ECurrentActivityType.Playing:
            state: IPlayingActivityDetails = {}
    }
} */