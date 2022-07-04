<script lang="ts" context="module">
    import type {Load} from './__types'

    export const load: Load = async ({url}) => {
        const query = url.searchParams.get('open')
        return {
            props: {
                open: new Set<string>(query?.split(','))
            }
        }
    }
</script>

<script lang="ts">
    import {page} from '$app/stores'
    import {goto} from '$app/navigation'
    import {writable} from 'svelte/store'

    import Back from '$lib/Back.svelte'
    import Foldout from '$lib/Foldout.svelte'
    import PLLCube from '$lib/PLLCube.svelte'
    import CubeButton from '$lib/CubeButton.svelte'
    import cubes from '$lib/PLLCubes'

    export let open: Set<string>

    const titles = Object.keys(cubes) as PLLSections[]

    const openStore = writable(open)
    const toggle = (title: string) => () => {
        if ($openStore.has(title))
            $openStore.delete(title)
        else
            $openStore.add(title)
        
        if ($openStore.size === 0)
            $page.url.searchParams.delete('open')
        else
            $page.url.searchParams.set('open', [...$openStore.values()].join(','))
        
        goto(`?${$page.url.searchParams.toString()}`, {noscroll: true})
    }
</script>

<Back url="/"/>
<main>
    <h1>PLL</h1>
    {#each titles as title}
        {@const section = cubes[title]}
        <Foldout {title} open={$openStore.has(title)} on:toggle={toggle(title)}>
            <div class="cubes">
                {#each Object.keys(section) as name}
                    {@const pll = section[name]}
                    <CubeButton text={name} href="/pll/{title}/{name}">
                        <PLLCube {...pll}/>
                    </CubeButton>
                {/each}
            </div>
        </Foldout>
    {/each}
</main>


<style>
    .cubes {
        display: grid;
        grid-template-columns: repeat(auto-fit, 10rem);
        grid-auto-rows: 10rem;
        gap: 1rem;
        font-size: .8rem;
        width: min(60rem, 90%);
        justify-content: center;
    }
</style>