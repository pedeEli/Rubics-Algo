import { createRouter } from "./context"
import superjson from "superjson"
import {algorithms} from './algorithm'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('algorithms.', algorithms)

export type AppRouter = typeof appRouter