# The language class

### The bot uses the language class to use a specific language.
Something noteworthy: client-side language refers to the end-user's side (aka Discord), server-side refers to the console or whatever the server accesses, and global refers to the command languages.


```ts
class botLang {
    ...
    constructor(clientSideLang, serverSideLang, globalLang) {
        ...
    }
}

// All of the properties parsed are from the same type: lang which is the language for each one.
```

#### getClientLang()
```ts
public getClientLang = () => {
    return this.botClientLang
} // Returns the bot's current client-side language.
```
#### getServerLang()
```ts
public getServerLang = () => {
    return this.botServerLang
} // Returns the bot's current server-side language.
```
#### getGlobalLang()
```ts
public getGlobalLang = () => {
    return this.botGlobalLang
} // Returns the bot's current global language.
```

#### reloadTextFiles()
```ts
public reloadTextFiles() {
    ...
    return customConsole.log('Files reloaded!')
} // Reloads the language files and announces the reloading to the console.
```

#### getLoadingText()
```ts
public getLoadingText() {
    ...
    return randomLoadingText
} // Returns a pseudo-random loading text from an array of 20 sentences.
```

#### getClientText()
```ts
public getClientText(languageProperty: string) {
    ...
    if languageProperty not in clientLanguageFile return languageProperty 
    
    ...

    else ... 
        return languagePropertyString
} // Pseudo-Code, basically returns the inputted value back if not found in the language array.
```

#### getServerText()
```ts
public getServerText(languageProperty: string) {
    ...
    if languageProperty not in serverLanguageFile return languageProperty 

    ...

    else ... 
        return languagePropertyString
} // Pseudo-Code, basically returns the inputted value back if not found in the language array.
```

#### getGlobalText()
```ts
public getGlobalText(languageProperty: string) {
    ...
    if languageProperty not in globalLanguageFile return languageProperty 

    ...

    else ... 
        return languagePropertyString
} // Pseudo-Code, basically returns the inputted value back if not found in the language array.
```
