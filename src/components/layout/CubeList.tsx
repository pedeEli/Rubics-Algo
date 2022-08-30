import type {ReactNode} from 'react'
import CubeButton from '@/components/CubeButton'
import Accordion from '@/components/layout/Accordion'
import Back from '@/components/Back'

interface CubeListProps<Heading extends 'oll' | 'pll'> {
  heading: Heading,
  cubes: Heading extends 'oll'
    ? Record<Cube.OLLSection, Record<string, Cube.OLLCubeProps>>
    : Record<Cube.PLLSection, Record<string, Cube.PLLCubeProps>>,
  render: (props: Heading extends 'oll' ? Cube.OLLCubeProps : Cube.PLLCubeProps) => ReactNode
}

const CubeList = <Heading extends 'oll' | 'pll'>({cubes, heading, render}: CubeListProps<Heading>) => {
  return <>
    <Back href='/'/>
    <main className="w-4/5 max-w-3xl mx-auto" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <h1 className="text-4xl font-bold">{heading.toUpperCase()}</h1>
      <div className="py-2"/>
      <Accordion>
        {Object.entries(cubes).map(([title, section]) => {
          return <Accordion.Panel key={title} title={title}>
            <div className="flex flex-wrap gap-3">
              {Object.entries(section).map(([name, props]) => {
                return <div key={name} className="w-40 h-40">
                  <CubeButton text={name} href={`/${heading}/${title}/${name}`}>
                    {render(props as any)}
                  </CubeButton>
                </div>
              })}
            </div>
          </Accordion.Panel>
        })}
      </Accordion>
    </main>
  </>
}

export default CubeList