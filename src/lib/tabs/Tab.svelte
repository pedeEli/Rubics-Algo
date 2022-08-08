<script lang="ts">
    import {getContext} from 'svelte'

    export let tab: string

    let element: HTMLDivElement
    const getHeight = () => {
        // const {height} = element.getBoundingClientRect()
        // return height
        return element.offsetHeight
    }
    getContext<(tab: string, getHeight: () => number) => void>('height')(tab, getHeight)
</script>

<div class="tab" bind:this={element}>
    <slot/>
</div>

<style>
    .tab {
        grid-row: 1 / 2;
        padding-block: 1rem;
    }
</style>