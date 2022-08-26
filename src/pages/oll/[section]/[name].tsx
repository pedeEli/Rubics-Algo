import type {NextPage, InferGetServerSidePropsType} from 'next'
import AlgoList from '@/components/layout/AlgoList'
import {getCubeServerSideProps, isOLLSection, isOLLName} from '@/utils/cube'

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({name, section, algos}) => {
  return <AlgoList type="oll" name={name} section={section} defaultAlgos={algos}/>
}

export default Page

export const getServerSideProps = getCubeServerSideProps('oll', isOLLSection, isOLLName)