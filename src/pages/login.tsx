import type {NextPage, GetServerSideProps} from 'next'
import type {BuiltInProviderType} from 'next-auth/providers';
import Button from '@/components/button/Button'
import Back from '@/components/Back'
import {signIn, getProviders, type LiteralUnion, type ClientSafeProvider} from 'next-auth/react'

interface ServerSideProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const Login: NextPage<ServerSideProps> = ({providers}) => {
  return <>
    <Back href="/"/>
    <main className="max-w-3xl mx-auto bg-surface dark:bg-surface-dark p-7 h-full" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <h1 className="text-4xl text-center font-bold">Login</h1>
      <div className="py-2"/>
      <div className="flex flex-col gap-4 items-center">
        {Object.entries(providers).map(([_, provider]) => {
          return <Button key={provider.id} onClick={() => signIn(provider.id, {callbackUrl: '/account'})}>Login using {provider.name}</Button>
        })}
      </div>
    </main>
  </>
}

export default Login


import {unstable_getServerSession} from 'next-auth/next'
import {authOptions} from '@/pages/api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({req, res}) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/account'
      }
    }
  }

  const providers = await getProviders()
  if (!providers) {
    return {
      notFound: true
    }
  }

  return {
    props: { providers }
  }
}