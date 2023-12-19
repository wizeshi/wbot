# customConsole

### The custom console is a class used by the bot to display messages such as actions made by users, show the bot's current configurations, reload the language files, and more.


#### log(message, color?, msgtype?)
```ts
// Displays a message on process.stdout
// You also can input color (IntelliSense will auto-suggest)
message: string // Message to output
color: color // Uses a special color type to make IntelliSense autocomplete. 
// Optional. Defaults to white
// Also check docs/types/color.md
msgtype: msgtype // Uses a special msgtype type to make IntelliSense autocomplete.
// Optional. Defaults to "Info"
// Also check docs/types/msgtype.md
```

#### update(frames, min, max, interval, color?, msgtype?, callback?) 
```ts
// Uses the logUpdate package to update dynamically the console.
// You also can input color (IntelliSense will auto-suggest)
frames: Array<any> // Frames you want the console to use. 
min: number // Number used to determine what frame to show first. Leave at 1 for the first.
max: number // Number at which to stop iterating through the frames array.
interval: number // Number of milliseconds between each logging frame.
color: color // Uses a special color type to make IntelliSense autocomplete. 
// Optional. Defaults to white
// Also check docs/types/color.md
msgtype: msgtype // Uses a special msgtype type to make IntelliSense autocomplete. 
// Optional. Default to "Info"
// Also check docs/types/msgtype.md
callback: afterCallback // Uses a special callback type to make some properties optional.
// Also check docs/types/callback.md
```
