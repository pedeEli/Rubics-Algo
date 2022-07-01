<script lang="ts">
    import {createEventDispatcher} from 'svelte'

    export let title: string
    export let open = false

    const dispatch = createEventDispatcher()
    const toggle = () => {
        open = !open
        dispatch('toggle', open)
    }
</script>

<h2 on:click={toggle}>{title}</h2>
{#if open}
    <slot/>
{/if}

<style>
    h2 {
        cursor: pointer;
    }
</style>