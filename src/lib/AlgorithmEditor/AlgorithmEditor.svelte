<script lang="ts">
    import Ripple from '@smui/ripple'
    import Button from '@smui/button'
    import TextField from '@smui/textfield'

    import {turnToString} from '$lib/algos'
    import Keyboard from './Keyboard.svelte'

    import Tabs, {Tab} from '$lib/tabs'

    import {writable} from 'svelte/store'
    import {createEventDispatcher} from 'svelte'

    import SelectableAlgorithm, {isTurn} from './SelectableAlgorithm.svelte'
    import type {Selected, SelectedTurn, SelectedGroup} from './SelectableAlgorithm.svelte'

    export let algo: RubicsAlgorithm
    export let show: boolean

    let double = writable(false)
    let prime = writable(false)
    let side = writable<SingleFingerSide | FullHandSide | ''>('')

    export let selected: Selected


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

    const selectNew = (index: number) => {
        selected = {
            type: 'new',
            index
        }
        resetKeyboard()
    }

    const selectTurn = (turn: Turn, index: number, group?: SelectedTurn['group']) => {
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

    const selectGroup = (group: TurnGroup, index: number, side: SelectedGroup['side']) => {
        selected = {
            type: 'group',
            group,
            index,
            side
        }
        resetKeyboard()
    }

    const selectInsert = (index: number, group = -1) => {
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

    const addGroup = () => {
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

    const deleteSelected = () => {
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

    const insertLeft = () => {
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

    const insertRight = () => {
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

    let activeTab = 'turns'

    $: showKeyboard = activeTab === 'turns' && show
</script>


<div class="editor" bind:this={editor} class:initialShow>
    <h2>New Algorithm</h2>
    
    <Tabs tabs={['turns', 'info']} bind:active={activeTab}>
        <Tab tab="turns">
            <SelectableAlgorithm
                editable
                bind:algo
                bind:selected
                on:selectnew={resetKeyboard}
                on:selectgroup={resetKeyboard}
                on:selectturn={({detail}) => {
                    $side = detail.turn.side
                    $prime = detail.turn.double
                    $double = detail.turn.double
                }}
            />
        </Tab>
        <Tab tab="info">
            <span class="info">
                <TextField textarea label="Info" value="" input$resizable={false}/>
                <SelectableAlgorithm
                    bind:algo
                    bind:selected
                />
                <!-- <span class="algo">  
                    {#each algo.turns as turn, index}
                        {#if 'turns' in turn}
                            <span class="turn-group">
                                <button
                                    use:Ripple={{surface: true}}
                                    class="mdc-button"
                                    class:mdc-button--raised={equalsGroup(selected, turn) && selected.side === 'left'}
                                    on:click={selectGroup(turn, index, 'left')}
                                >(</button>
                                {#each turn.turns as t, i}
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
                </span> -->
            </span>
        </Tab>
    </Tabs>
    <div class="buttons">
        <Button variant="raised" on:click={save}>Save</Button>
        <Button variant="raised">Reset</Button>
    </div>
</div>

{#if showKeyboard}
    <Keyboard
        bind:double={$double}
        bind:prime={$prime}
        bind:side={$side}
        on:letter={handleLetter}
        on:previous={selectPrevious}
        on:next={selectNext}
        on:group={addGroup}
        on:delete={deleteSelected}
        on:insertleft={insertLeft}
        on:insertright={insertRight}
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
    h2 {
        margin: 0;
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

    .info {
        display: flex;
        flex-direction: column;
        margin-inline: 1rem;
    }
</style>