import type {RequestHandler} from './__types/[oll]'
import {getAlgos} from '$lib/algos'

export const get: RequestHandler = getAlgos('oll')