<script lang="ts">
    import {turnToString} from '$lib/algos'
    import Ripple from '@smui/ripple'
    import TurnInfo from '$lib/TurnInfo.svelte'

    export let algo: RubicsAlgorithm

    let info: string | SingleTurnInfo | DoubleTurnInfo = 'Nothing selected'
    const showInfo = (turn: Turn) => () => {
        if ('info' in turn && turn.info)
            return info = turn.info
        info = 'No additional info'
    }
</script>

<span class="algo">
    {#each algo.turns as turn}
        {#if 'turns' in turn}
            <span class="turn-group">
                {#each turn.turns as t}
                    <button use:Ripple={{surface: true}} class="mdc-button" on:click={showInfo(t)}>{turnToString(t)}</button>
                {/each}
            </span>
        {:else}
            <button use:Ripple={{surface: true}} class="mdc-button" on:click={showInfo(turn)}>{turnToString(turn)}</button>
        {/if}
    {/each}
</span>
<TurnInfo {info}/>

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
    .mdc-button {
        text-transform: none;
        height: auto;
        height: 2em;
        width: 2em;
        min-width: min-content;
    }
</style>