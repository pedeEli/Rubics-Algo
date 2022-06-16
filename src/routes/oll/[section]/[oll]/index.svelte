<script lang="ts" context="module">
    import type {Load} from './__types'

    export const load: Load = async ({params, fetch}) => {
        const data = await fetch(`/oll/${params.section}/${params.oll}/algos`)
        const algos = await data.json()
        return {
            props: {
                ...params,
                algos
            }
        }
    }
</script>

<script lang="ts">
    import Back from '$lib/Back.svelte'
    import cubes from '$lib/OLLCubes'
    import OLLCube from '$lib/OLLCube.svelte'

    export let section: OLLSections
    export let oll: OLLType
    export let algos: string[]

    const cube = cubes[section][oll]
</script>

<Back href="/oll"/>
<main>
    <h1>{oll}</h1>
    <div class="cube">
        <OLLCube {...cube}/>
    </div>
    {#each algos as algo}
        <div>{algo}</div>
    {/each}
</main>

<style>
    .cube {
        width: min(50vw, 10rem);
        height: min(50vw, 10rem);
        appearance: none;
        border-radius: 1rem;
        padding: min(5vw, 1rem);
        background: hsl(0, 0%, 33%);
    }
</style>