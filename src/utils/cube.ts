const ollSectionRegex = /^(All Corners Oriented|All Edges Oriented|No Edges Oriented|P Shapes|W Shapes|T Shapes|Square Shapes|Fish Shapes|C Shapes|Small Lightning Bolts|Big Lightning Bolts|L Shapes|Knight Move Shapes|I Shapes|Awkward Shapes)$/
export const isOLLSection = (section: string): section is Cube.OLLSection => {
  return ollSectionRegex.test(section)
}

const ollNameRegex = /^OLL (\d+)$/
export const isOLLName = (name: string): boolean => {
  const result = ollNameRegex.exec(name)
  if (!result)
    return false
  const n = parseInt(result[1] as string)
  return n >= 1 && n <= 57
}


const pllSectionRegex = /^(Edges Only|Corners Only|Adjacent Corner Swap|Diagonal Corner Swap|G Permutations)$/
export const isPLLSection = (section: string): section is Cube.PLLSection => {
  return pllSectionRegex.test(section)
}

const pllNameRegex = /^(Ua|Ub|H|Z|Aa|Ab|E|T|F|Ja|Jb|Ra|Rb|Y|V|Na|Nb|Ga|Gb|Gc|Gd)$/
export const isPLLName = (name: string): boolean => {
  return pllNameRegex.test(name)
}


import type {GetServerSideProps} from 'next'
import fs from 'fs'

export const getCubeServerSideProps = <Section extends Cube.OLLSection | Cube.PLLSection>(
  type: 'oll' | 'pll',
  isSection: (section: string) => section is Section,
  isName: (name: string) => boolean
): GetServerSideProps<{name: string, section: Section, algos: Algo.RubicsAlgorithm[]}, {name: string, section: Section}> => async ({params}) => {
  if (!params)
    return { notFound: true }

  const {section, name} = params
  if (!isSection(section) || !isName(name))
    return { notFound: true }

  const algosStr = await fs.promises.readFile(`./algos/${type}/${name}.algos.json`, 'utf-8')
  const algos = JSON.parse(algosStr) as Algo.RubicsAlgorithm[]

  return {
    props: { section, name, algos }
  }
}