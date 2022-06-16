<script lang="ts">
    export let title: string

    let show = false
</script>

<h2 on:click={() => show = !show}>{title}</h2>
{#if show}
    <slot/>
{/if}

<style>
    h2 {
        cursor: pointer;
    }
</style>