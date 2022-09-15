import {useState, useEffect} from 'react'

export const useOnline = () => {
  const [online, set] = useState(true)

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