import path from 'path'
import fs from 'fs'

/**
 * @param {string} file
 * @returns 
 */
const rewrite = (file) => {
    console.log(file)
    const filePath = path.join(dir, file)
    const contents = fs.readFileSync(filePath, 'utf8')
    const json = parseAlgo(contents)
    
    const newFile = `${file}.json`
    const newFilePath = path.join(dir, newFile)
    fs.writeFileSync(newFilePath, JSON.stringify(json, null, 4), 'utf8')
    fs.rmSync(filePath)
}

/**
 * @param {string} algo
 */
const parseAlgo = (algo) => {
    const tokens = getTokens(algo)
    const turns = tokens.map(parseToken)
    return {turns}
}

/**
 * @param {string} str
 * @return {Array<string | string[]>}
 */
const getTokens = (str) => {
    const tokens = []
    let token = ''
    let i = 0
    while (i < str.length) {
        const char = str[i]
        if (char === ' ') {
            if (token === '') {
                i++
                continue
            }
            tokens.push(token)
            token = ''
            i++
        } else if (char === '(') {
            let j = i + 1
            let between = ''
            while (j < str.length) {
                const c = str[j]
                if (c === ')') {
                    i = j + 1
                    break
                }
                between += c
                j++
            }
            token = ''
            tokens.push(getTokens(between))
        } else {
            token += char
            i++
        }
    }
    if (token !== '')
        tokens.push(token)
    return tokens
}

/**
 * @param {string | string[]} token
 */
const parseToken = (token) => {
    if (typeof token === 'string') {
        const side = token.match(/([a-zA-Z])/)[1]
        const prime = /'/.test(token)
        const double = /2/.test(token)
        return {
            side,
            prime,
            double
        }
    }
    return {
        turns: token.map(parseToken)
    }
}

/**
 * @param {string} file
 */
const putIntoArray = (file) => {
    const filePath = path.join(dir, file)
    const contents = fs.readFileSync(filePath, 'utf8')
    const json = JSON.parse(contents)
    const newJson = [json]
    const newJsonStr = JSON.stringify(newJson, null, 4)
    fs.writeFileSync(filePath, newJsonStr)
}

/**
 * @param {string} file
 */
const rename = (file) => {
    const filePath = path.join(dir, file)
    const contents = fs.readFileSync(filePath, 'utf8')
    const [name, type] = file.split('.')
    const newFile = [name, 'algos', type].join('.')
    const newFilePath = path.join(dir, newFile)
    fs.writeFileSync(newFilePath, contents, 'utf8')
    fs.rmSync(filePath)
}

const dir = path.resolve('static/algos/pll')
// fs.readdirSync(dir).filter(file => file.endsWith('.json')).forEach(rewrite)
// fs.readdirSync(dir).forEach(putIntoArray)
fs.readdirSync(dir).forEach(rename)