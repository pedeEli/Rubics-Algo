<script lang="ts">
    import Tab, {Label} from '@smui/tab'
    import TabBar from '@smui/tab-bar'

    import {setContext, onMount} from 'svelte'
    import type {Writable} from 'svelte/store'

    type T = $$Generic
    interface $$Slots {
        default: { tab: T }
    }

    export let tabs: T[]
    export let active: T

    $: index = tabs.indexOf(active)
    $: height = getHeights.get(active)

    const getHeights = new Map<T, Writable<number>>()
    setContext('height', (tab: T, height: Writable<number>) => getHeights.set(tab, height))

    onMount(() => {
        height = getHeights.get(active)
    })
</script>

<TabBar {tabs} let:tab bind:active>
    <Tab {tab}>
        <Label>{tab}</Label>
    </Tab>
</TabBar>
<div class="wrapper" style:height={$height ? `${$height}px` : 'auto'}>
    <div class="carusal" style:transform="translateX(-{index * 100}%)">
        <slot/>
    </div>
</div>

<style>
    .wrapper {
        transition: height 300ms ease;
        overflow: hidden;
    }
    .carusal {
        display: grid;
        grid-auto-columns: 100%;
        transition: transform 300ms ease;
        align-items: flex-start;
    }
</style>