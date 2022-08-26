import type {NextPage} from 'next'
import CubeList from '@/components/layout/CubeList'
import CubeButton from '@/components/CubeButton'
import cubes from '@/data/PLLCubes'

const PLL: NextPage = () => {
    return <CubeList heading="pll" cubes={cubes} render={props => <CubeButton.PLLCube {...props}/>}/>
}

export default PLL