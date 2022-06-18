<script lang="ts" context="module">
    export const prerender = true
</script>

<script lang="ts">
    import {goto} from '$app/navigation'

    import CubeButton from '$lib/CubeButton.svelte'
    import OLLCube from '$lib/OLLCube.svelte'
</script>

<main>
    <CubeButton text="OLL" on:click={() => goto('oll')}>
        <OLLCube
            topLeft={1}
            right={1}
            bottomLeft={2}
            bottom={1}
        />
    </CubeButton>
    <CubeButton text="PLL" on:click={() => goto('pll')}>
        <OLLCube/>
    </CubeButton>
</main>

<style>
    main {
        height: 100%;
        display: grid;
        grid-template-columns: 10rem 10rem;
        grid-template-rows: 10rem;
        place-content: center;
        gap: 2rem;
    }
</style>