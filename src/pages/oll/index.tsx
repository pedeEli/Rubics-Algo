import type {NextPage} from 'next'
import CubeList from '@/components/CubeList'
import CubeButton from '@/components/CubeButton'
import cubes from '@/data/OLLCubes'

const OLL: NextPage = () => {
  return <CubeList heading="oll" cubes={cubes} render={props => <CubeButton.OLLCube {...props}/>}/>
}

export default OLL