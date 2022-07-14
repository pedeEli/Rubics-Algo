<script lang="ts">
    import Ripple from '@smui/ripple'
    import Button from '@smui/button'

    import {turnToString} from '$lib/algos'
    import Keyboard from '$lib/Keyboard.svelte'
    import {writable} from 'svelte/store'
    import {createEventDispatcher} from 'svelte'

    export let algo: RubicsAlgorithm
    export let show: boolean

    let double = writable(false)
    let prime = writable(false)
    let side = writable<SingleFingerSide | FullHandSide | ''>('')

    interface SelectedTurn {
        type: 'turn',
        turn: Turn,
        index: number,
        group?: [TurnGroup, number]
    }
    interface SelectedGroup {
        type: 'group',
        group: TurnGroup,
        index: number,
        side: 'left' | 'right'
    }
    interface SelectedNew {
        type: 'new',
        index: number
    }
    interface SelectedInsert {
        type: 'insert',
        index: number,
        group: number
    }

    type Selected = SelectedTurn | SelectedGroup | SelectedNew | SelectedInsert

    export let selected: Selected

    const isTurn = (selected: Selected): selected is SelectedTurn => selected.type === 'turn'
    const isGroup = (selected: Selected): selected is SelectedGroup => selected.type === 'group'
    const isNew = (selected: Selected): selected is SelectedNew => selected.type === 'new'
    const isInsert = (selected: Selected): selected is SelectedInsert => selected.type === 'insert'

    $: isTurn(selected) && (selected.turn.side = $side as SingleFingerSide | FullHandSide)
    $: isTurn(selected) && (selected.turn.prime = $prime)
    $: isTurn(selected) && (selected.turn.double = $double)

    const resetKeyboard = () => {
        $side = '',
        $prime = false
        $double = false
    }

    let editor: HTMLDivElement
    let initialShow = show
    let previousShow = show

    $: if (previousShow !== show) {
        previousShow = show      
        if (show) {
            editor.style.height = 'auto'
            const {height} = editor.getBoundingClientRect()
            editor.style.height = '0px'
            editor.getBoundingClientRect()
            editor.style.height = `${height}px`
            editor.addEventListener('transitionend', () => editor.style.height = 'auto', {once: true})
        } else {
            editor.style.height = `${editor.getBoundingClientRect().height}px`
            editor.getBoundingClientRect()
            requestAnimationFrame(() => {
                editor.style.height = '0px'
            })
        }
    }

    const handleLetter = (event: CustomEvent<SingleFingerSide | FullHandSide>) => {
        const {type, index} = selected
        const {turns} = algo
        if (type !== 'new' && type !== 'insert')
            return
        const newTurn: Turn = {
            side: event.detail,
            prime: $prime,
            double: $double as any // why the fuck is this nessesary?????
        }
        if (type === 'insert') {
            if (selected.group === -1) {
                selected = {
                    type: 'turn',
                    turn: newTurn,
                    index
                }
                algo.turns = [...turns.slice(0, index), newTurn, ...turns.slice(index)]
                return
            }
            const group = turns[selected.group] as TurnGroup
            group.turns = [...group.turns.slice(0, index), newTurn, ...group.turns.slice(index)]
            turns[selected.group] = group
            selected = {
                type: 'turn',
                turn: newTurn,
                index,
                group: [group, selected.group]
            }
            return
        }
        if (index === -1) {
            selected = {
                type: 'turn',
                turn: newTurn,
                index: turns.length
            }
            algo.turns = [...turns, newTurn]
            return
        }
        const group = turns[index] as TurnGroup
        group.turns.push(newTurn)
        algo.turns[index] = group
        selected = {
            type: 'turn',
            turn: newTurn,
            index: group.turns.length - 1,
            group: [group, index]
        }
    }

    const selectNew = (index: number) => () => {
        selected = {
            type: 'new',
            index
        }
        resetKeyboard()
    }

    const selectTurn = (turn: Turn, index: number, group?: SelectedTurn['group']) => () => {
        $side = turn.side
        $prime = turn.prime
        $double = turn.double
        selected = {
            type: 'turn',
            turn,
            index,
            group
        }
    }

    const selectGroup = (group: TurnGroup, index: number, side: SelectedGroup['side']) => () => {
        selected = {
            type: 'group',
            group,
            index,
            side
        }
        resetKeyboard()
    }

    const selectInsert = (index: number, group = -1) => () => {
        resetKeyboard()
        selected = {
            type: 'insert',
            index,
            group
        }
    }

    const selectPrevious = () => {
        const {index, type} = selected
        const {turns} = algo
        if (type === 'new') {
            if (index === -1) {
                if (turns.length === 0)
                    return () => {}
                const previous = turns[turns.length - 1]
                if ('turns' in previous)
                    return selectGroup(previous, turns.length - 1, 'right')
                return selectTurn(previous, turns.length - 1)
            }
            const group = turns[index] as TurnGroup
            const groupLength = group.turns.length
            if (groupLength === 0)
                return selectGroup(group, index, 'left')
            return selectTurn(group.turns[groupLength - 1], groupLength - 1, [group, index])
        }
        if (type === 'insert') {
            if (selected.group === -1) {
                if (index === 0)
                    return () => {}
                const previous = turns[index - 1]
                if ('turns' in previous)
                    return selectGroup(previous, index - 1, 'right')
                return selectTurn(previous, index - 1)
            }
            const group = turns[selected.group] as TurnGroup
            if (index === 0)
                return selectGroup(group, selected.group, 'left')
            return selectTurn(group.turns[index - 1], index - 1, [group, selected.group])
        }
        if (type === 'group') {
            if (selected.side === 'right')
                return selectNew(index)
            if (index === 0)
                return () => {}
            const previous = turns[index - 1]
            if ('turns' in previous)
                return selectGroup(previous, index - 1, 'right')
            return selectTurn(previous, index - 1)
        }
        if (selected.group) {
            const {group} = selected
            if (index === 0)
                return selectGroup(group[0], group[1], 'left')
            const groupTurns = group[0].turns
            return selectTurn(groupTurns[index - 1], index - 1, group)
        }
        if (index === 0)
            return () => {}
        const previous = turns[index - 1]
        if ('turns' in previous)
            return selectGroup(previous, index - 1, 'right')
        return selectTurn(previous, index - 1)
    }
    const handlePrevious = () => selectPrevious()()

    const selectNext = () => {
        const {index, type} = selected
        const {turns} = algo
        if (type === 'new') {
            if (index === -1)
                return () => {}
            return selectGroup(turns[index] as TurnGroup, index, 'right')
        }
        if (type === 'insert') {
            if (selected.group === -1) {
                const next = algo.turns[index]
                if ('turns' in next)
                    return selectGroup(next, index, 'left')
                return selectTurn(next, index)
            }
            const group = turns[selected.group] as TurnGroup
            return selectTurn(group.turns[index], index, [group, selected.group])
        }
        if (type === 'group') {
            const {group} = selected
            if (selected.side === 'left') {
                if (group.turns.length === 0)
                    return selectNew(index)
                return selectTurn(group.turns[0], 0, [group, index])
            }
            if (index === turns.length - 1)
                return selectNew(-1)
            const next = turns[index + 1]
            if ('turns' in next)
                return selectGroup(next, index + 1, 'left')
            return selectTurn(next, index + 1)
        }
        if (selected.group) {
            const {group} = selected
            const groupTurns = group[0].turns
            if (index === groupTurns.length - 1)
                return selectNew(group[1])
            return selectTurn(groupTurns[index + 1], index + 1, group)
        }
        if (index === turns.length - 1)
            return selectNew(-1)
        const next = turns[index + 1]
        if ('turns' in next)
            return selectGroup(next, index + 1, 'left')
        return selectTurn(next, index + 1)
    }
    const handleNext = () => selectNext()()

    const getGroup = () => {
        const {type, index} = selected
        const {turns} = algo
        if (type === 'insert' && selected.group === -1) {
            algo.turns = [...turns.slice(0, index), {turns: []}, ...turns.slice(index)]
            return selectNew(index)
        }
        if (type !== 'new' && index !== -1)
            return () => {}
        algo.turns = [...turns, {turns: []}]
        return selectNew(algo.turns.length - 1)
    }
    const handleGroup = () => getGroup()()

    const getDelete = () => {
        const {type, index} = selected
        const {turns} = algo
        if (type === 'new' || type === 'insert')
            return () => {}
        if (type === 'group') {
            algo.turns = [...turns.slice(0, index), ...selected.group.turns,...turns.slice(index + 1)]
            if (selected.side === 'left') {
                if (algo.turns.length === 0 || index === algo.turns.length)
                    return selectNew(-1)
                const next = algo.turns[index]
                if ('turns' in next)
                    return selectGroup(next, index, 'left')
                return selectTurn(next, index)
            }
            const newIndex = index + selected.group.turns.length
            if (algo.turns.length === 0 || newIndex === algo.turns.length)
                return selectNew(-1)
            const next = algo.turns[newIndex]
            if ('turns' in next)
                return selectGroup(next, newIndex, 'left')
            return selectTurn(next, newIndex)
        }
        if (selected.group) {
            const group = selected.group[0]
            const {turns} = group
            const groupIndex = selected.group[1]
            group.turns = [...turns.slice(0, index), ...turns.slice(index + 1)]
            algo.turns[groupIndex] = group
            if (group.turns.length === 0 || index === group.turns.length) {
                return selectNew(groupIndex)
            }
            return selectTurn(group.turns[index], index, [group, groupIndex])
        }
        algo.turns = [...turns.slice(0, index), ...turns.slice(index + 1)]
        if (algo.turns.length === 0 || index === algo.turns.length)
            return selectNew(-1)
        const next = algo.turns[index]
        if ('turns' in next)
            return selectGroup(next, index, 'left')
        return selectTurn(next, index)
    }
    const handleDelete = () => getDelete()()

    const selectInsertLeft = () => {
        const {type, index} = selected
        if (type === 'new' || type === 'insert')
            return () => {}
        if (type === 'group') {
            if (selected.side === 'right')
                return () => {}
            return selectInsert(index)
        }
        if (selected.group)
            return selectInsert(index, selected.group[1])
        return selectInsert(index)
    }
    const handleInsertLeft = () => selectInsertLeft()()

    const selectInsertRight = () => {
        const {type, index} = selected
        if (type === 'new' || type === 'insert')
            return () => {}
        if (type === 'group') {
            if (selected.side === 'left')
                return selectInsert(0, index)
            if (index === algo.turns.length - 1)
                return () => {}
            return selectInsert(index + 1)
        }
        if (selected.group) {
            const {group} = selected
            if (index === group[0].turns.length - 1)
                return () => {}
            return selectInsert(index + 1, group[1])
        }
        if (index === algo.turns.length - 1)
            return () => {}
        return selectInsert(index + 1)
    }
    const handleInsertRight = () => selectInsertRight()()

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



    const disablePrevious = (selected: Selected) => {
        const {type, index} = selected
        if (type === 'turn' && index === 0 && !selected.group)
            return true
        if (type === 'group' && index === 0 && selected.side === 'left')
            return true
        if (type === 'insert' && index === 0 && selected.group === -1)
            return true
        return false
    }
    const disableGroup = (selected: Selected) => {
        const {type, index} = selected
        if (type === 'new' && index === -1)
            return false
        if (type === 'insert' && selected.group === -1)
            return false
        return true
    }
    const disableDelete = (selected: Selected) => {
        const {type} = selected
        return type === 'new' || type === 'insert'
    }
    const disableInsertLeft = (selected: Selected) => {
        const {type, index} = selected
        if (type === 'new' || type === 'insert')
            return true
        if (type === 'group' && selected.side === 'right')
            return true
        return false
    }
    const disableInsertRight = (selected: Selected) => {
        const {type, index} = selected
        if (type === 'new' || type === 'insert')
            return true
        if (type === 'group')
            return selected.side === 'right' && index === algo.turns.length - 1
        if (selected.group)
            return index === selected.group[0].turns.length - 1
        return index === algo.turns.length - 1
    }


    const dispatch = createEventDispatcher()
    const save = () => dispatch('save', algo)
</script>


<div class="editor" bind:this={editor} class:initialShow>
    <h2>New Algorithm</h2>
    <span class="algo">
        {#each algo.turns as turn, index}
            {#if equalsInsert(selected, index)}
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
                        {#if equalsInsert(selected, i, index)}
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
    </span>
    <div class="buttons">
        <Button variant="raised" on:click={save}>Save</Button>
        <Button variant="raised">Reset</Button>
    </div>
</div>

{#if show}
    <Keyboard
        bind:double={$double}
        bind:prime={$prime}
        bind:side={$side}
        on:letter={handleLetter}
        on:previous={handlePrevious}
        on:next={handleNext}
        on:group={handleGroup}
        on:delete={handleDelete}
        on:insertleft={handleInsertLeft}
        on:insertright={handleInsertRight}
        disablePrevious={disablePrevious(selected)}
        disableGroup={disableGroup(selected)}
        disableDelete={disableDelete(selected)}
        disableInsertLeft={disableInsertLeft(selected)}
        disableInsertRight={disableInsertRight(selected)}
    />
{/if}

<style>
    .editor {
        overflow: hidden;
        transition: height 200ms ease;
        height: 0px;
    }
    .editor.initialShow {
        height: auto;
    }
    .algo {
        display: flex;
        flex-wrap: wrap;
        gap: .2rem;
        text-transform: none;
        max-width: 60ch;
        margin-block: 1rem;
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
    h2 {
        margin: 0;
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

    .buttons {
        display: flex;
        justify-content: right;
        gap: .3rem;
    }
</style>