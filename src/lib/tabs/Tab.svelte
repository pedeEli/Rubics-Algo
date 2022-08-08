<script lang="ts">
    import {getContext} from 'svelte'
    import {writable} from 'svelte/store'
    import type {Writable} from 'svelte/store'


    export let tab: string

    let offsetHeight = writable(0)

    getContext<(tab: string, height: Writable<number>) => void>('height')(tab, offsetHeight)
</script>

<div class="tab" bind:offsetHeight={$offsetHeight}>
    <slot/>
</div>

<style>
    .tab {
        grid-row: 1 / 2;
        padding-block: 1rem;
    }
</style>