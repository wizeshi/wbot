import fs from 'node:fs'

import lu from 'log-update'

type cor = 'logWhite' | 'errorRed' | 'warningYellow' | 'chatBlue' | 'devGreen' | 'logMagenta' 
type tipo = 'info' | 'warn' | 'error'
type afterCallback = {
    log?: afterLog,
    callback?: any,
    maintain?: boolean
}

type afterLog = {
    msg: any,
    cor?: cor,
    tipo?: tipo,
}


enum corEnum {
    'reset' = "\x1b[0m",
    'logWhite' = '\x1b[37m',
    'errorRed' = '\x1b[31m',
    'warningYellow' = "\x1b[33m",
    'chatBlue' = "\x1b[34m",
    'devGreen' = "\x1b[32m",
    'logMagenta' = "\x1b[35m",
}

var logUpdate = lu.create(process.stdout, {
    showCursor: true
})

/**
 * My own custom implementation of the Javascript Console.
 * In truth, it only makes it slightly different, for example adding color, message updates, and more.
 */

class customConsole {

    /** 
     * console.log mas mais bacano
     * 
     * @param {string} mensagem A mensagem
     * @param {string} cor A cor
     * @param {string} tipo O tipo da mensagem
     * @returns {void} console.log() 
    **/

    public log(mensagem: any, cor?: cor, tipo?: tipo): void {
        var color: corEnum | undefined

        if (cor == undefined) {
            color = undefined
        } else {
            color = corEnum[`${cor}`]
        }

        // data
        var date = new Date()

        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

        //tipo da mensagem
        const error = `[${currentDate}] : [Console/ERROR] @ [Client-Main]: `
        const warning = `[${currentDate}] : [Console/WARN] @ [Client-Main]: `
        const info = `[${currentDate}] : [Console/INFO] @ [Client-Main]: `

        let usarTipo

        switch (tipo) {
            case 'error':
                usarTipo = error
                break
            case 'warn':
                usarTipo = warning
                break
            case undefined:
            case 'info':
                usarTipo = info
                break
        }

        function writeToLogFile(usarTipo: string | undefined, mensagem: string) {
            let y = `${usarTipo} ${mensagem}\n`

            let path = ("C:\\Users\\wizeshi\\Desktop\\Ambiente de Trabalho\\wBot\\logs") // <- Este deve ser substituido para a localização da pasta das logs, se parar se hosteado localmente.

            fs.appendFile(`${path}/log-${year}-${month}-${day}.log`, y, function(err) {
                if (err) {
                    console.log(err)
                }
            })
        }

        let x = cor == undefined ? (corEnum.logWhite + usarTipo + mensagem + corEnum.reset) : (color + usarTipo + mensagem + corEnum.reset)

        console.log(x)

        writeToLogFile(usarTipo, mensagem)
    }

    public update(frames: Array<any>, min: number, max: number, interval: number, cor?: cor, tipo?: tipo, callback?: afterCallback) {
        var start = min - 1
        var end = max - 1
        var color: corEnum | undefined

        if (cor == undefined) {
            color = undefined
        } else {
            color = corEnum[`${cor}`]
        }

        // data
        var date = new Date()

        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

        //tipo da mensagem
        const error = `[${currentDate}] : [Console/ERROR] @ [Client-Main]: `
        const warning = `[${currentDate}] : [Console/WARN] @ [Client-Main]: `
        const info = `[${currentDate}] : [Console/INFO] @ [Client-Main]: `

        let usarTipo: string

        switch (tipo) {
            case 'error':
                usarTipo = error
                break
            case 'warn':
                usarTipo = warning
                break
            case undefined:
            case 'info':
                usarTipo = info
                break
        }

        var mInterval = setInterval(() => {
            var frame = frames[start % frames.length]
            start++
            let x = cor == undefined ? (corEnum.logWhite + usarTipo + frame + corEnum.reset) : (color + usarTipo + frame + corEnum.reset)

            logUpdate(x)
            if (start > end) {
                if (callback?.maintain != true) {
                    logUpdate.clear()
                }
                if (callback?.log?.msg != undefined) {
                    this.log(callback.log.msg, callback.log.cor, callback.log.tipo)
                }
                if (callback?.callback != undefined) {
                    callback.callback()
                }
                clearInterval(mInterval)
            }
        }, interval)
    }
}

var consoleToExport = new customConsole()

export var cc = consoleToExport