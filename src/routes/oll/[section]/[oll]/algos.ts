import path from 'path'
import fs from 'fs'
import type {RequestHandler} from './__types/algos'

const {readFile} = fs.promises

export const get: RequestHandler = async ({params}) => {
    const {oll} = params

    const file = path.join(process.cwd(), 'algos', oll)

    if (!fs.existsSync(file)) {
        return {
            body: []
        }
    }

    const fileContents = await readFile(file, 'utf-8')
    const algos = fileContents.split('\n')

    return {
        body: algos
    }
}