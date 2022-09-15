export const ollSectionRegex = /^All Corners Oriented|All Edges Oriented|No Edges Oriented|P Shapes|W Shapes|T Shapes|Square Shapes|Fish Shapes|C Shapes|Small Lightning Bolts|Big Lightning Bolts|L Shapes|Knight Move Shapes|I Shapes|Awkward Shapes$/
export const isOLLSection = (section: string): section is Cube.OLLSection => {
  return ollSectionRegex.test(section)
}

export const ollNameRegex = /^OLL ([1-9]|[1-4][0-9]|5[0-7])$/
export const isOLLName = (name: string): name is Cube.OLLName => {
  return ollNameRegex.test(name)
}


export const pllSectionRegex = /^Edges Only|Corners Only|Adjacent Corner Swap|Diagonal Corner Swap|G Permutations$/
export const isPLLSection = (section: string): section is Cube.PLLSection => {
  return pllSectionRegex.test(section)
}

export const pllNameRegex = /^Ua|Ub|H|Z|Aa|Ab|E|T|F|Ja|Jb|Ra|Rb|Y|V|Na|Nb|Ga|Gb|Gc|Gd$/
export const isPLLName = (name: string): name is Cube.PLLName => {
  return pllNameRegex.test(name)
}


import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import fs from 'fs'
import path from 'path'

export const getCubeServerSideProps = <
  Section extends Cube.OLLSection | Cube.PLLSection,
  Name extends Cube.OLLName | Cube.PLLName = Section extends Cube.OLLSection ? Cube.OLLName : Cube.PLLName
>(
  type: 'oll' | 'pll',
  isSection: (section: string) => section is Section,
  isName: (name: string) => name is Name
): GetServerSideProps<{
  name: Name,
  section: Section,
  defaultAlgoIds: Algo.RubicsAlgoId[],
  userAlgoIds: Algo.RubicsAlgoId[] | null
}, {name: string, section: string}> => async ({params, req, res}) => {
  if (!params)
    return { notFound: true }

  const {section, name} = params
  if (!isSection(section) || !isName(name))
    return { notFound: true }

  const defaultAlgosStr = await fs.promises.readFile(`./algos/${type}/${name}.algos.json`, 'utf-8')
  path.resolve('./algos')
  const defaultAlgos = JSON.parse(defaultAlgosStr) as Algo.RubicsAlgorithm[]
  const defaultAlgoIds = defaultAlgos.map<Algo.RubicsAlgoId>((algo, index) => [`default-${index}`, algo])

  const userAlgoIds = await getUserAlgos(type, section, name, req, res, defaultAlgoIds)

  return {
    props: { section, name, defaultAlgoIds, userAlgoIds: userAlgoIds ?? null }
  }
}

import {unstable_getServerSession} from 'next-auth/next'
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import {prisma} from '@/server/db/client'
import { Prisma } from '@prisma/client'

const getUserAlgos = async (
  type: string,
  section: string,
  name: string,
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
  defaultAlgoIds: Algo.RubicsAlgoId[]
) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session?.user)
    return
  
  const algos = await prisma.algorithm.findMany({
    where: {
      userId: session.user.id,
      type,
      section,
      name
    }
  })

  if (algos.length)
    return algos.map<Algo.RubicsAlgoId>(algo => [algo.id, algo.algorithm as any])

  await prisma.algorithm.createMany({
    data: defaultAlgoIds.map<Prisma.AlgorithmCreateManyInput>(algo => ({
      algorithm: algo[1] as any,
      type,
      section,
      name,
      userId: session.user!.id
    }))
  })

  return defaultAlgoIds
}