// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import {useEffect} from 'react'

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    if ('serviceWorker' in window.navigator) {
      window.navigator.serviceWorker.register('/sw.js')
        .catch(console.error)
      return
    }
    console.log('service workers are not supported')
  }, [])

  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
      <Login/>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);


import LoginSVG from '@/components/svg/Login'
import PersonSVG from '@/components/svg/Person'
import Fab from '@/components/button/Fab'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/router'

const Login = () => {
  const router = useRouter()
  const session = useSession()

  if (/^\/(login|account)/.test(router.pathname))
    return <></>

  return (
    <div className="fixed bottom-3 right-3">
      {session.status === 'authenticated'
      ? <Fab
        href="/account"
        variant="raised"
        color="secondary"
      >
        <PersonSVG/>
      </Fab>
      : <Fab
        href="/login"
        variant="raised"
        color="secondary"
      >
        <LoginSVG/>
      </Fab>
      }
    </div>
  )
}