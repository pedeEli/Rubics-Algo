import type {NextPage} from 'next'
import CubeList from '@/components/layout/CubeList'
import CubeButton from '@/components/button/CubeButton'
import cubes from '@/data/OLLCubes'

const OLL: NextPage = () => {
  return <CubeList heading="oll" cubes={cubes} render={props => <CubeButton.OLLCube {...props}/>}/>
}

export default OLL