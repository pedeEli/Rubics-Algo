<script lang="ts">
    import {turnToString} from '$lib/algos'

    export let algo: RubicsAlgorithm
</script>

<span class="algo">
    {#each algo.turns as turn}
        {#if 'turns' in turn}
            <span class="turn-group">
                {#each turn.turns as t}
                    <span>{turnToString(t)}</span>
                {/each}
            </span>
        {:else}
            <span>{turnToString(turn)}</span>
        {/if}
    {/each}
</span>

<style>
    .algo {
        display: flex;
        flex-wrap: wrap;
        gap: .2rem;
        text-transform: none;
    }
    .turn-group {
        display: flex;
        gap: .2rem;
    }
    .turn-group::before {
        content: "(";
    }
    .turn-group::after {
        content: ")";
    }
</style>