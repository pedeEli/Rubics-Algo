import type {RequestHandler} from './__types/[oll]'



export const get: RequestHandler = async ({params, url}) => {
    const data = await fetch(`${url.origin}/algos/oll/${params.oll}`)
    if (!data.ok) {
        return {
            body: {
                ...params,
                algos: []
            }
        }
    }
    const algos = await data.text()
    return {
        body: {
            ...params,
            algos: algos.split('\n')
        }
    }
}