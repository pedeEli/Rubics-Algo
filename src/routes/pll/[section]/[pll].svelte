<script lang="ts">
    import cubes from '$lib/PLLCubes'
    import PLLCube from '$lib/PLLCube.svelte'
    import Details from '$lib/Details.svelte'

    export let section: PLLSections
    export let pll: string
    export let algos: string[]

    const cube = cubes[section][pll]
</script>

<Details back="/pll" title="{pll} Permutation" {algos}>
    <PLLCube {...cube}/>
</Details>