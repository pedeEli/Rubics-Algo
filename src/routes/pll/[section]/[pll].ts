import type {RequestHandler} from './__types/[pll]'



export const get: RequestHandler = async ({params, url}) => {
    const data = await fetch(`${url.origin}/algos/pll/${params.pll}`)
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