# The color enum

##### looking for the [color type](../types/color.md)?

### The color enum is used by customConsole to convert between its' corresponding type, to make life easier for the devs. It is also basically a list of strings.

```ts
enum colorEnum {
    'reset' = "\x1b[0m",
    'logWhite' = '\x1b[37m',
    'errorRed' = '\x1b[31m',
    'warningYellow' = "\x1b[33m",
    'chatBlue' = "\x1b[34m",
    'devGreen' = "\x1b[32m",
    'logMagenta' = "\x1b[35m",
}
```