import type {ReactNode} from 'react'
import CubeButton from '@/components/CubeButton'
import Accordion from '@/components/Accordion'
import Back from '@/components/Back'

interface CubeListProps<Heading extends 'oll' | 'pll'> {
  heading: Heading,
  cubes: Heading extends 'oll'
    ? Record<Cube.OLLSection, Record<string, Cube.OLLCubeProps>>
    : Record<Cube.PLLSection, Record<string, Cube.PLLCubeProps>>
  render: (props: Heading extends 'oll' ? Cube.OLLCubeProps : Cube.PLLCubeProps) => ReactNode
}

const CubeList = <Heading extends 'oll' | 'pll'>({cubes, heading, render}: CubeListProps<Heading>) => {
  return <>
    <Back href='/'/>
    <main className="w-4/5 max-w-3xl mx-auto" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <h1 className="text-4xl">{heading.toUpperCase()}</h1>
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

// <script lang="ts">
//     import {goto} from '$app/navigation'
//     import {page} from '$app/stores'

//     import Accordion, {Panel, Header, Content} from '@smui-extra/accordion'

//     import Back from '$lib/Back.svelte'
//     import CubeButton from '$lib/CubeButton.svelte'

//     export let heading: 'oll' | 'pll'
//     export let open: Set<string>
//     export let cubes: Record<string, Record<string, object>>

//     const titles = Object.keys(cubes)

//     const openHandler = (title: string) => () => {
//         open.add(title)
//         updateQuery()
//         goto(`?${$page.url.searchParams.toString()}`, {noscroll: true})
//     }

//     const closeHandler = (title: string) => () => {
//         open.delete(title)
//         updateQuery()
//         goto(`?${$page.url.searchParams.toString()}`, {noscroll: true})
//     }

//     const updateQuery = () => {
//         if (open.size === 0)
//             return $page.url.searchParams.delete('open')
//         $page.url.searchParams.set('open', [...open.values()].join(','))
//     }
// </script>

// <Back url="/"/>
// <main>
//     <h1>{heading.toUpperCase()}</h1>
//     <Accordion style="width: min(60rem, 90%);" multiple>
//         {#each titles as title}
//         {@const section = cubes[title]}
//         <Panel 
//             open={open.has(title)}
//             on:SMUIAccordionPanel:opened={openHandler(title)}
//             on:SMUIAccordionPanel:closed={closeHandler(title)}
//         >
//             <Header>{title}</Header>
//             <Content style="display: flex; justify-content: center;">
//                 <div class="cubes">
//                     {#each Object.keys(section) as name}
//                         {@const props = section[name]}
//                         <CubeButton text={name} href="/{heading}/{title}/{name}">
//                             <slot {props}/>
//                         </CubeButton>
//                     {/each}
//                 </div>
//             </Content>
//         </Panel>
//         {/each}
//     </Accordion>
// </main>

// <style>
//     .cubes {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, 10rem);
//         grid-auto-rows: 10rem;
//         gap: 1rem;
//         font-size: .8rem;
//         width: min(60rem, 90%);
//         justify-content: center;
//     }
// </style>