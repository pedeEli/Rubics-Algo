<script lang="ts" context="module">
    import type {Load} from './__types/[pll]'

    export const load: Load = async ({params, fetch}) => {
        const data = await fetch(`/algos/pll/${params.pll}`)
        if (!data.ok) {
            return {
                props: {
                    ...params,
                    algos: []
                }
            }
        }
        const algos = await data.text()
        return {
            props: {
                ...params,
                algos: algos.split('\n')
            }
        }
    }
</script>

<script lang="ts">
    import Back from '$lib/Back.svelte'
    import cubes from '$lib/PLLCubes'
    import PLLCube from '$lib/PLLCube.svelte'

    export let section: PLLSections
    export let pll: string
    export let algos: string[]

    const cube = cubes[section][pll]
</script>

<Back url="/pll"/>
<main>
    <h1>{pll} Permutation</h1>
    <div class="cube">
        <PLLCube {...cube}/>
    </div>
    {#each algos as algo}
        <div class="algos">{algo}</div>
    {/each}
</main>

<style>
    main {
        display: grid;
        grid-template-areas:
            "header header"
            "cube algos";
        justify-content: center;
        gap: 1rem;
        margin-inline: 1rem;
    }
    h1 {
        grid-area: header;
        text-align: center;
    }
    .cube {
        width: min(50vw, 10rem);
        height: min(50vw, 10rem);
        appearance: none;
        border-radius: 1rem;
        padding: min(5vw, 1rem);
        background: hsl(var(--clr-gray-500));
        grid-area: cube;
    }
    .algos {
        grid-area: algos;
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>