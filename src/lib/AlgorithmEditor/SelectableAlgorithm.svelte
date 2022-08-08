<script lang="ts" context="module">
    export interface SelectedTurn {
        type: 'turn',
        turn: Turn,
        index: number,
        group?: [TurnGroup, number]
    }
    export interface SelectedGroup {
        type: 'group',
        group: TurnGroup,
        index: number,
        side: 'left' | 'right'
    }
    export interface SelectedNew {
        type: 'new',
        index: number
    }
    export interface SelectedInsert {
        type: 'insert',
        index: number,
        group: number
    }
    export type Selected = SelectedTurn | SelectedGroup | SelectedNew | SelectedInsert;
    
    export const isTurn = (selected: Selected): selected is SelectedTurn => selected.type === 'turn'
    export const isGroup = (selected: Selected): selected is SelectedGroup => selected.type === 'group'
    export const isNew = (selected: Selected): selected is SelectedNew => selected.type === 'new'
    export const isInsert = (selected: Selected): selected is SelectedInsert => selected.type === 'insert'
</script>

<script lang="ts">
    import Ripple from '@smui/ripple'

    import {turnToString} from '$lib/algos'

    import {createEventDispatcher} from 'svelte'

    export let algo: RubicsAlgorithm
    export let selected: Selected
    export let editable = false

    const dispatch = createEventDispatcher<{selectnew: SelectedNew, selectturn: SelectedTurn, selectgroup: SelectedGroup}>()

    const selectNew = (index: number) => () => {
        selected = {
            type: 'new',
            index
        }
        dispatch('selectnew', selected)
    }
    const selectTurn = (turn: Turn, index: number, group?: SelectedTurn['group']) => () => {
        selected = {
            type: 'turn',
            turn,
            index,
            group
        }
        dispatch('selectturn', selected)
    }
    const selectGroup = (group: TurnGroup, index: number, side: SelectedGroup['side']) => () => {
        selected = {
            type: 'group',
            group,
            index,
            side
        }
        dispatch('selectgroup', selected)
    }

    const equalsTurn = (selected: Selected, turn: Turn, group?: SelectedTurn['group']): selected is SelectedTurn => {
        if (!isTurn(selected))
            return false
        if (!group)
            return selected.turn === turn
        if (!selected.group)
            return false
        return selected.turn === turn && selected.group[0] === group[0] && selected.group[1] === group[1]
    }
    const equalsGroup = (selected: Selected, group: TurnGroup): selected is SelectedGroup => isGroup(selected) && selected.group === group
    const equalsNew = (selected: Selected, index: number): selected is SelectedNew => isNew(selected) && selected.index === index
    const equalsInsert = (selected: Selected, index: number, group = -1): selected is SelectedInsert => {
        return isInsert(selected)
            && selected.index === index
            && selected.group === group
    }
</script>


<span class="algo">
    {#each algo.turns as turn, index}
        {#if editable && equalsInsert(selected, index)}
            <button
                use:Ripple={{surface: true}}
                class="mdc-button mdc-button--raised"
                on:click={selectNew(-1)}
            >
                <span class="caret">|</span>
            </button>
        {/if}
        {#if 'turns' in turn}
            <span class="turn-group">
                <button
                    use:Ripple={{surface: true}}
                    class="mdc-button"
                    class:mdc-button--raised={equalsGroup(selected, turn) && selected.side === 'left'}
                    on:click={selectGroup(turn, index, 'left')}
                >(</button>
                {#each turn.turns as t, i}
                    {#if editable && equalsInsert(selected, i, index)}
                        <button
                            use:Ripple={{surface: true}}
                            class="mdc-button mdc-button--raised"
                            on:click={selectNew(-1)}
                        >
                            <span class="caret">|</span>
                        </button>
                    {/if}
                    <button
                        use:Ripple={{surface: true}}
                        class="mdc-button"
                        class:mdc-button--raised={equalsTurn(selected, t, [turn, index])}
                        on:click={selectTurn(t, i, [turn, index])}
                    >
                        {turnToString(equalsTurn(selected, t, [turn, index]) ? selected.turn : t)}
                    </button>
                {/each}
                {#if editable}
                    <button
                        use:Ripple={{surface: true}}
                        class="mdc-button"
                        class:mdc-button--outlined={!equalsNew(selected, index)}
                        class:mdc-button--raised={equalsNew(selected, index)}
                        on:click={selectNew(index)}
                    >
                        {#if equalsNew(selected, index)}
                            <span class="caret">|</span>
                        {/if}
                    </button>
                {/if}
                <button
                    use:Ripple={{surface: true}}
                    class="mdc-button"
                    class:mdc-button--raised={equalsGroup(selected, turn) && selected.side === 'right'}
                    on:click={selectGroup(turn, index, 'right')}
                >)</button>
            </span>
        {:else}
            <button
                use:Ripple={{surface: true}}
                class="mdc-button"
                class:mdc-button--raised={equalsTurn(selected, turn)}
                on:click={selectTurn(turn, index)}
            >
                {turnToString(equalsTurn(selected, turn) ? selected.turn : turn)}
            </button>
        {/if}
    {/each}
    {#if editable}
        <button
            use:Ripple={{surface: true}}
            class="mdc-button"
            class:mdc-button--outlined={!equalsNew(selected, -1)}
            class:mdc-button--raised={equalsNew(selected, -1)}
            on:click={selectNew(-1)}
        >
            {#if equalsNew(selected, -1)}
                <span class="caret">|</span>
            {/if}
        </button>
    {/if}
</span>


<style>
    .algo {
        display: flex;
        flex-wrap: wrap;
        gap: .2rem;
        text-transform: none;
        max-width: 60ch;
    }
    .turn-group {
        display: flex;
        gap: .2rem;
    }
    .mdc-button {
        text-transform: none;
        height: auto;
        height: 2em;
        width: 2em;
        min-width: min-content;
        padding: 0 8px 0 8px;
    }
    .caret {
        animation: 1s blink step-end infinite;
    }

    @keyframes blink {
        from, to {
            color: inherit;
        }
        50% {
            color: transparent;
        }
    }
</style>