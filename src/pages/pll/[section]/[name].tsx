import type {NextPage, InferGetServerSidePropsType} from 'next'
import AlgoList from '@/components/layout/AlgoList'
import {getCubeServerSideProps, isPLLSection, isPLLName} from '@/utils/cube'

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({name, section, defaultAlgoIds, userAlgoIds}) => {
  return <AlgoList type="pll" name={name} section={section} defaultAlgoIds={defaultAlgoIds} userAlgoIds={userAlgoIds}/>
}

export default Page

export const getServerSideProps = getCubeServerSideProps('pll', isPLLSection, isPLLName)