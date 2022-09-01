import type {NextPage, GetServerSideProps} from 'next';
import type {BuiltInProviderType} from 'next-auth/providers';
import {getProviders, signOut, type LiteralUnion, type ClientSafeProvider} from 'next-auth/react'
import Back from '@/components/Back'
import Button from '@/components/button/Button'

interface ServerSideProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const Account: NextPage<ServerSideProps> = ({providers}) => {
  return <>
    <Back href="/"/>
    <main className="max-w-3xl mx-auto bg-surface dark:bg-surface-dark p-7 h-full" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <h1 className="text-4xl text-center font-bold">Account</h1>
      <div className="py-2"/>
      <Button onClick={() => signOut({callbackUrl: '/login'})}>Sign out</Button>
    </main>
  </>
}

export default Account


import {unstable_getServerSession} from 'next-auth/next'
import {authOptions} from '@/pages/api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({req, res}) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/login'
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