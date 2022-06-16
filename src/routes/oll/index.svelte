<script lang="ts">
    import Back from '$lib/Back.svelte'
    import Foldout from '$lib/Foldout.svelte'
    import OLLCube from '$lib/OLLCube.svelte'
    import CubeButton from '$lib/CubeButton.svelte'

    import cubes from '$lib/OLLCubes'
</script>

<Back href="/"/>
<main>
    <h1>OLL</h1>
    {#each Object.keys(cubes) as title}
        {@const section = cubes[title]}
        <Foldout {title}>
            <div class="cubes">
                {#each Object.keys(section) as name}
                    {@const oll = section[name]}
                    <div class="cube">
                        <CubeButton text={name}>
                            <OLLCube {...oll}/>
                        </CubeButton>
                    </div>
                {/each}
            </div>
        </Foldout>
    {/each}
</main>

<style>
    main {
        padding-block: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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