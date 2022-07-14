<script lang="ts" context="module">
    import {getAlgos} from '$lib/algos'
    import type {Load} from './__types/[oll]'

    export const load: Load = getAlgos('oll')
</script>

<script lang="ts">
    import cubes from '$lib/OLLCubes'
    import OLLCube from '$lib/OLLCube.svelte'
    import Details from '$lib/Details.svelte'

    export let section: OLLSections
    export let oll: OLLType
    export let algos: RubicsAlgorithm[]

    const cube = cubes[section][oll]
</script>

<Details back="/oll" title={oll} defaultAlgos={algos}>
    <OLLCube {...cube}/>
</Details>