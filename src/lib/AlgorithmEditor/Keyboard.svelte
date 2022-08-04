<script lang="ts">
    import Ripple from '@smui/ripple'
    import {Icon} from '@smui/common'
    import {Svg} from '@smui/common/elements'
    import {mdiChevronLeft, mdiChevronRight, mdiDelete, mdiCodeBrackets} from '@mdi/js'

    import type {TransitionConfig} from 'svelte/transition'
    import {cubicOut} from 'svelte/easing'

    import {createEventDispatcher} from 'svelte'

    export let double: boolean
    export let prime: boolean
    export let side: SingleFingerSide | FullHandSide | '' = ''

    export let disablePrevious = false
    export let disableDelete = false
    export let disableGroup = false
    export let disableInsertLeft = false
    export let disableInsertRight = false

    const fly = (node: Element, {}): TransitionConfig => {
        return {
            duration: 300,
            easing: cubicOut,
            css: (t, u) => {
                return `transform: translateY(${u * 110}%);`
            }
        }
    }

    const letters: Array<SingleFingerSide | FullHandSide> = [
        'R', 'L', 'U', 'F', 'D', 'B',
        'r', 'l', 'u', 'f', 'd', 'b',
        'M', 'S', 'E', 'x', 'y', 'z'
    ]

    const togglePrime = () => prime = !prime
    const toggleDouble = () => double = !double
    const setSide = (s: SingleFingerSide | FullHandSide) => () => {
        side = s
        dispatch('letter', s)
    }

    const dispatch = createEventDispatcher()

    const nextHandler = () => dispatch('next')
    const previousHandler = () => dispatch('previous')
    const insertLeftHandler = () => dispatch('insertleft')
    const insertRightHandler = () => dispatch('insertright')
    const delHandler = () => dispatch('delete')
    const groupHandler = () => dispatch('group')

    const toggleKey = "key mdc-button mdc-button--raised"
    const actionKey = `${toggleKey} smui-button--color-secondary`
</script>

<div class="keyboard" transition:fly>
    <div class="grid">
        <button use:Ripple={{surface: true}} class="{toggleKey} long" class:smui-button--color-secondary={!prime} on:click={togglePrime}>Prime</button>
        <button use:Ripple={{surface: true}} class="{toggleKey} long" class:smui-button--color-secondary={!double} on:click={toggleDouble}>Double</button>

        {#each letters as letter}
            <button use:Ripple={{surface: true}} class="{toggleKey}" class:smui-button--color-secondary={side !== letter} on:click={setSide(letter)}>{letter}</button>
        {/each}

        <button use:Ripple={{surface: true}} disabled={disablePrevious} class="{actionKey} action" on:click={previousHandler}>
            <Icon component={Svg} viewBox="0 0 24 24" style="height: var(--icon-height);">
                <path fill="currentColor" d={mdiChevronLeft}/>
            </Icon>
        </button>
        <button use:Ripple={{surface: true}} class="{actionKey} action" on:click={nextHandler}>
            <Icon component={Svg} viewBox="0 0 24 24" style="height: var(--icon-height);">
                <path fill="currentColor" d={mdiChevronRight}/>
            </Icon>
        </button>
        <button use:Ripple={{surface: true}} disabled={disableDelete} class="{actionKey} action" on:click={delHandler}>
            <Icon component={Svg} viewBox="0 0 24 24" style="height: var(--icon-height);">
                <path fill="currentColor" d={mdiDelete}/>
            </Icon>
        </button>
        <button use:Ripple={{surface: true}} disabled={disableGroup} class="{actionKey} action" on:click={groupHandler}>
            <Icon component={Svg} viewBox="0 0 24 24" style="height: var(--icon-height);">
                <path fill="currentColor" d={mdiCodeBrackets}/>
            </Icon>
        </button>
        <div class="insert smui-button__group">
            <button use:Ripple={{surface: true}} disabled={disableInsertLeft} class="{actionKey} insert-left" on:click={insertLeftHandler}>
                <Icon component={Svg} viewBox="0 0 24 24" style="height: var(--icon-height);">
                    <path fill="currentColor" d={mdiChevronLeft}/>
                </Icon>
            </button>
            <div class="insert-text">Insert</div>
            <button use:Ripple={{surface: true}} disabled={disableInsertRight} class="{actionKey} insert-right" on:click={insertRightHandler}>
                <Icon component={Svg} viewBox="0 0 24 24" style="height: var(--icon-height);">
                    <path fill="currentColor" d={mdiChevronRight}/>
                </Icon>
            </button>
        </div>
    </div>
</div>


<style lang="scss">
    .keyboard {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 10;
        background-color: var(--clr-surface);
    }
    .grid {
        width: min(25rem, 100%);
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: 1fr;
        gap: .3rem;
        padding-block: 6px;
        padding-inline: 4px;
        --icon-height: 2em;
        aspect-ratio: 6 / 5;
    }
    .key {
        height: auto;
        min-width: auto;
        padding: 0;
        text-transform: none;
    }
    .long {
        grid-column: span 3;
    }
    .active {
        background-color: darkcyan;
    }
    .insert {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-column: span 2;
        user-select: none;
    }
    .insert-left {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        padding-right: .7em;
        height: 100%;
    }
    .insert-right {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        padding-left: .7em;
        height: 100%;
    }
    .insert-text {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        transform: translateY(-5%);
        height: 100%;
        // background-color: red;
    }

    @mixin mq($query, $value) {
        @media (#{$query}: $value) {
            .grid {
                grid-template-columns: repeat(12, 1fr);
                aspect-ratio: 12 / 4.5;
                --icon-height: 1.6rem;
            }
            .insert {
                grid-column: span 4;
            }
            .action {
                grid-column: span 2;
                
            }
        }
    }

    @include mq(max-width, 450px);
    @include mq(max-height, 500px);
</style>