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

<Back url="/"/>
<main>
    <h1>OLL</h1>
    {#each titles as title}
        {@const section = cubes[title]}
        <Foldout {title}>
            <div class="cubes">
                {#each names(section) as name}
                    {@const oll = section[name]}
                    <CubeButton text={name} href="/oll/{title}/{name}">
                        <OLLCube {...oll}/>
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