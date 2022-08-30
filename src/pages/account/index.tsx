import type {NextPage, GetServerSideProps} from 'next';
import type {BuiltInProviderType} from 'next-auth/providers';
import {getProviders, useSession, signOut, type LiteralUnion, type ClientSafeProvider} from 'next-auth/react'
import Back from '@/components/Back'
import Button from '@/components/button/Button'

interface ServerSideProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const Account: NextPage<ServerSideProps> = ({providers}) => {
  const session = useSession()
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


export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
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