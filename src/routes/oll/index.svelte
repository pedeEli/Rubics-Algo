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
    import OLLCube from '$lib/OLLCube.svelte'
    import List from '$lib/List.svelte'
    import cubes from '$lib/OLLCubes'

    export let open: Set<string>
</script>

<List heading="oll" {open} {cubes} let:props>
    <OLLCube {...props}/>
</List>