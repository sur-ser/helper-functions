const fs = require("fs");
const {random: strRandom} = require("./string");
const regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)' // ?
const mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)'

function checkString(str) {
    if (typeof str !== 'string' && !(str instanceof Buffer) && !(str instanceof ArrayBuffer) && !(str instanceof Array)
        //check for array like object
        && !(
            Array.isArray(str) ||
            (!!str &&
                typeof str === "object" &&
                str.hasOwnProperty("length") &&
                typeof str.length === "number" &&
                str.length > 0 &&
                (str.length - 1) in str
            )
        )
    ) {
        throw new TypeError('Expected a string, Buffer, ArrayBuffer, Array, or array-like object.')

    }
}

module.exports = {
    isBase64String: function (str) {
        if (str instanceof Boolean || typeof str === 'boolean') {
            return false
        }
        if (str === '') {
            return false
        }
        return (new RegExp('^' + regex + '$', 'gi')).test(str)
    },
    isBase64File: function (str) {
        if (str instanceof Boolean || typeof str === 'boolean') {
            return false
        }
        if (str === '') {
            return false
        }
        return new RegExp(`^${mimeRegex}${regex}$`, 'gi').test(str)
    },
    stringToBase64File: function (str, mime) {
        if (!this.isBase64String(str)) {
            str = this.stringToBase64(str)
        }
        return `data:${mime};base64,${str}`
    },
    stringToBase64: function (str) {
        checkString(str)
        return Buffer.from(str).toString('base64')
    },
    base64ToString: function (str) {
        checkString(str)
        if (!this.isBase64String(str)) {
            throw new TypeError('Expected a base64 string')
        }
        return Buffer.from(str, 'base64').toString('utf-8')
    },
    base64ToBuffer: function (str) {
        if (!this.isBase64File(str)) {
            throw new TypeError('Expected a base64 file string')
        }
        return Buffer.from(str.replace(new RegExp(`^${mimeRegex}`, 'gi'), ''), 'base64')
    },
    getExtFromBase64: function (str) {
        if (!this.isBase64File(str)) {
            throw new TypeError('Expected a base64 file string')
        }
        return str.split(';')[0].split('/')[1].toLowerCase()
    },
    saveBase64ToFileSync: function (str, path) {
        if (!this.isBase64File(str)) {
            throw new TypeError('Expected a base64 file string')
        }

        if (!path) {
            path = `./${strRandom(10).toLowerCase()}.${this.getExtFromBase64(str)}`
        }

        fs.writeFileSync(path, this.base64ToBuffer(str))

        return path
    },
    saveBase64ToFile: function (str, path) {
        return new Promise((resolve, reject) => {
            if (!this.isBase64File(str)) {
                reject(new TypeError('Expected a base64 file string'))
            }
            if (!path) {
                path = `./${strRandom(10).toLowerCase()}.${this.getExtFromBase64(str)}`
            }

            fs.writeFile(path, this.base64ToBuffer(str), (err) => {
                if (err) {
                    reject(err)
                }
                resolve(path)
            })
        })
    }
}