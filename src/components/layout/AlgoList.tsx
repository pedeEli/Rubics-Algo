import Back from '@/components/Back'
import Algorithm from '@/components/Algorithm'
import ollCubes from '@/data/OLLCubes'
import pllCubes from '@/data/PLLCubes'
import CubeButton from '@/components/CubeButton'
import Button from '@/components/button/Button'

interface AlgoListProps<Type extends 'oll' | 'pll'> {
  type: Type,
  name: string,
  section: Type extends 'oll' ? Cube.OLLSection : Cube.PLLSection,
  defaultAlgos: Algo.RubicsAlgorithm[]
}

const AlgoList = <Props extends AlgoListProps<'oll'> | AlgoListProps<'pll'>>(props: Props) => {
  return <>
    <Back href={`/${props.type}`}/>
    <main className="w-4/5 max-w-3xl mx-auto bg-surface dark:bg-surface-dark p-7 h-full" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <h1 className="text-4xl text-center">{props.name} {props.type === 'pll' ? 'Permutation' : ''}</h1>
      <div className="py-2"/>
      <div className="grid grid-cols-[10rem_auto] gap-4">
        <div className="aspect-square cube-bg">
          {props.type === 'oll'
          ? <CubeButton.OLLCube {...ollCubes[props.section][props.name]}/>
          : <CubeButton.PLLCube {...pllCubes[props.section][props.name]}/>}
        </div>
        <div className="self-center flex flex-col items-start gap-2">
          {props.defaultAlgos.map((algo, index) => {
            return <Button key={index} variant="raised"><Algorithm algo={algo}/></Button>
          })}
        </div>
      </div>
    </main>
  </>
}

export default AlgoList