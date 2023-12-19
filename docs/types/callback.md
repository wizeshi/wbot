# The callback type

### The [customConsole](/docs/classes/customConsole.md) class uses this type to execute an action after a sequence of updates has finished.

```ts
type afterCallback = {
    log?: afterLog,
    callback?: any,
    maintain?: boolean
}
// It also uses another type, which is the afterLog type.
// That uses customConsole.log to display a message on screen.
type afterLog = {
    msg: any,
    color?: color,
    msgtype?: msgtype,
}
// Refer to docs/types/color.md and docs/types/msgtype.md for more.
```