import type {Load} from '@sveltejs/kit'

type Params<T extends 'oll' | 'pll'> = {
    [K in T]: string
} & {
    section: string
}

export const getAlgos = <T extends 'oll' | 'pll' = 'oll' | 'pll'>(type: T): Load<Params<T>> => async ({params, fetch}) => {
    const data = await fetch(`/algos/${type}/${params[type]}.algos.json`)
    if (!data.ok) {
        return {
            props: {
                ...params,
                algos: []
            }
        }
    }
    const algos = await data.json()
    return {
        props: {
            ...params,
            algos: algos
        }
    }
}



export const turnToString = (turn: Turn) => {
    let str = turn.side
    if (turn.double)
        str += '2'
    if (turn.prime)
        str += '\''
    return str
}