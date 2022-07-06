import type {RequestHandler} from '@sveltejs/kit'

type Params<T extends 'oll' | 'pll'> = {
    [K in T]: string
} & {
    section: string
}

export const getAlgos = <T extends 'oll' | 'pll' = 'oll' | 'pll'>(type: T): RequestHandler<Params<T>> => async ({url, params}) => {
    const data = await fetch(`${url.origin}/algos/${type}/${params[type]}`)
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