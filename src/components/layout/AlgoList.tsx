import Back from '@/components/Back'
import Algorithm from '@/components/Algorithm'
import ollCubes from '@/data/OLLCubes'
import pllCubes from '@/data/PLLCubes'
import CubeButton from '@/components/button/CubeButton'
import Button from '@/components/button/Button'
import IconButton from '@/components/button/IconButton'
import AddSVG from '@/components/svg/Add'

import Editor from '@/components/editor'

import {useSession} from 'next-auth/react'
import {useState} from 'react'

interface AlgoListProps<Type extends 'oll' | 'pll'> {
  type: Type,
  name: string,
  section: Type extends 'oll' ? Cube.OLLSection : Cube.PLLSection,
  defaultAlgos: Algo.RubicsAlgorithm[]
}

const AlgoList = <Props extends AlgoListProps<'oll'> | AlgoListProps<'pll'>>(props: Props) => {
  const session = useSession()
  const [showEditor, setShowEditor] = useState(false)

  return <>
    <Back href={`/${props.type}`}/>
    <main className="max-w-3xl mx-auto bg-surface dark:bg-surface-dark p-7 min-h-full" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <div className="grid grid-cols-[1fr_1fr] items-center">
        <h1 className="text-4xl text-center font-bold col-start-1 col-end-3 row-start-1">
          {props.type === 'pll' ? `${props.name} Permutation` : props.name}
        </h1>
        {session.status === 'authenticated' && <IconButton onClick={e => {
          e.stopPropagation()
          setShowEditor(!showEditor)
        }} className="col-start-2 row-start-1 justify-self-end"><AddSVG/></IconButton>}
      </div>
      <div className="py-2"/>
      {session.status === 'authenticated' && <Editor show={showEditor}/>}
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