<script lang="ts" context="module">
    export const prerender = true
</script>

<script lang="ts">
    import {goto} from '$app/navigation'

    import Back from '$lib/Back.svelte'
    import Foldout from '$lib/Foldout.svelte'
    import OLLCube from '$lib/OLLCube.svelte'
    import CubeButton from '$lib/CubeButton.svelte'
    import cubes from '$lib/OLLCubes'

    const titles = Object.keys(cubes) as OLLSections[]
    const names = (section: Record<OLLType, OLLProps>) => Object.keys(section) as OLLType[]
</script>

<Back href="/"/>
<main>
    <h1>OLL</h1>
    {#each titles as title}
        {@const section = cubes[title]}
        <Foldout {title}>
            <div class="cubes">
                {#each names(section) as name}
                    {@const oll = section[name]}
                    <div class="cube">
                        <CubeButton text={name} on:click={() => goto(`/oll/${title}/${name}`)}>
                            <OLLCube {...oll}/>
                        </CubeButton>
                    </div>
                {/each}
            </div>
        </Foldout>
    {/each}
</main>

<style>
    .cubes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        gap: 1rem;
        font-size: .8rem;
        width: min(60rem, 90%);
    }
    .cube {
        width: 100%;
        aspect-ratio: 1 / 1;
    }
</style>