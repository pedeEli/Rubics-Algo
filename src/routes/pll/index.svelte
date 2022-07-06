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
    import PLLCube from '$lib/PLLCube.svelte'
    import List from '$lib/List.svelte'
    import cubes from '$lib/PLLCubes'

    export let open: Set<string>
</script>

<List heading="pll" {open} {cubes} let:props>
    <PLLCube {...props}/>
</List>