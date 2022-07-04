<script lang="ts" context="module">
    export const prerender = true
</script>

<script lang="ts">
    import CubeButton from '$lib/CubeButton.svelte'
    import OLLCube from '$lib/OLLCube.svelte'
    import PLLCube from '$lib/PLLCube.svelte'
</script>

<main>
    <CubeButton text="OLL" href="/oll">
        <OLLCube
            topLeft={1}
            right={1}
            bottomLeft={2}
            bottom={1}
        />
    </CubeButton>
    <CubeButton text="PLL" href="/pll">
        <PLLCube
            arrows={[
                {x1: 1, y1: 1, x2: 3, y2: 1},
                {x1: 3, y1: 1, x2: 3, y2: 3},
                {x1: 3, y1: 3, x2: 1, y2: 1}
            ]}
            top0={1}
            top2={1}
            right0={2}
            right2={3}
            bottom0={0}
            left2={0}
        />
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