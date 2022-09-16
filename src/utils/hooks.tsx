import {useState, useEffect} from 'react'

export const useOnline = () => {
  const [online, set] = useState(typeof window === 'undefined' ? true : window.navigator.onLine)

  const setOnline = () => set(true)
  const setOffline = () => set(false)

  useEffect(() => {
    if (typeof window === 'undefined')
      return
    
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)
    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  return online
}


import {getSession, SessionContextValue} from 'next-auth/react'
import {createContext, useContext, ReactNode} from 'react'

type Session = SessionContextValue<boolean> | {
  readonly data: null,
  readonly status: "loading"
}

const SESSION_KEY = 'session'

const SessionContext = createContext<Session>({ data: null, status: 'unauthenticated' })

interface SessionProviderProps {
  children: ReactNode[] | ReactNode,
  session?: Session
}

export const SessionProvider = ({children, session: _session}: SessionProviderProps) => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem(SESSION_KEY) === null) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      data: null,
      status: 'unauthenticated'
    } as Session))
  }

  const online = useOnline()
  const [session, setSession] = useState<Session>(
    _session ?? online
    ? {data: null, status: 'loading'}
    : JSON.parse(localStorage.getItem(SESSION_KEY)!)
  )

  useEffect(() => {
    if (!online)
      return
    getSession().then(session => {
      if (session) {
        setSession({status: 'authenticated', data: session})
        localStorage.setItem(SESSION_KEY, JSON.stringify({status: 'authenticated', data: session}))
        return
      }
      setSession({status: 'unauthenticated', data: null})
      localStorage.setItem(SESSION_KEY, JSON.stringify({status: 'unauthenticated', data: null}))
    })
  }, [])

  useEffect(() => {
    if (!online) {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY)!) as Session
      setSession(session)
      return
    }
    getSession().then(session => {
      if (session) {
        setSession({status: 'authenticated', data: session})
        localStorage.setItem(SESSION_KEY, JSON.stringify({status: 'authenticated', data: session}))
        return
      }
      setSession({status: 'unauthenticated', data: null})
      localStorage.setItem(SESSION_KEY, JSON.stringify({status: 'unauthenticated', data: null}))
    })
  }, [online])

  return <SessionContext.Provider value={session}>
    {children}
  </SessionContext.Provider>
}


export const useSession = (): Session => {
  const session = useContext(SessionContext)
  return session
}

// export const useSession = (): Session => {
//   if (typeof localStorage !== 'undefined' && localStorage.getItem(SESSION_KEY) === null) {
//     localStorage.setItem(SESSION_KEY, JSON.stringify({
//       data: null,
//       status: 'unauthenticated'
//     } as Session))
//   }

//   const online = useOnline()
//   const sessionNextAuth = useSessionNextAuth()
//   const [session, setSession] = useState<Session>(online ? sessionNextAuth : JSON.parse(localStorage.getItem(SESSION_KEY)!))

//   useEffect(() => {
//     if (online) {
//       setSession(sessionNextAuth)
//       localStorage.setItem(SESSION_KEY, JSON.stringify(sessionNextAuth))
//       return
//     }
//     const s = JSON.parse(localStorage.getItem(SESSION_KEY)!)
//     setSession(s)
//   }, [online, sessionNextAuth])

//   return session
// }