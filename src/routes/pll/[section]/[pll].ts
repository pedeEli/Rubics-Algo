import type {RequestHandler} from './__types/[pll]'
import {getAlgos} from '$lib/algos'

export const get: RequestHandler = getAlgos('pll')