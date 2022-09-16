import {trpc, getBaseUrl} from './trpc'
import superjson from 'superjson'

const EVENT_KEY = 'offline-events'

export const comsumeEvents = async () => {
  const client = trpc.createClient({
    url: `${getBaseUrl()}/api/trpc`,
    transformer: superjson
  })

  client.mutation('algorithms.delete', {id: ''})
}