import type {Load} from '@sveltejs/kit'

type Params<T extends 'oll' | 'pll'> = {
    [K in T]: string
} & {
    section: string
}

export const getAlgos = <T extends 'oll' | 'pll' = 'oll' | 'pll'>(type: T): Load<Params<T>> => async ({params, fetch}) => {
    const data = await fetch(`/algos/${type}/${params[type]}`)
    if (!data.ok) {
        return {
            props: {
                ...params,
                algos: []
            }
        }
    }
    const algos = await data.text()
    return {
        props: {
            ...params,
            algos: algos.split('\n')
        }
    }
}