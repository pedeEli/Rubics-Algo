import type {NextPage, InferGetServerSidePropsType} from 'next'
import AlgoList from '@/components/AlgoList'
import {getCubeServerSideProps, isPLLSection, isPLLName} from '@/utils/cube'

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({name, section, algos}) => {
  return <AlgoList type="pll" name={name} section={section} defaultAlgos={algos}/>
}

export default Page

export const getServerSideProps = getCubeServerSideProps('pll', isPLLSection, isPLLName)