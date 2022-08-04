<script lang="ts">
    import Tab, {Label} from '@smui/tab'
    import TabBar from '@smui/tab-bar'

    import {setContext, onMount} from 'svelte'

    export let tabs: string[]
    let active = 'turns'
    $: index = tabs.indexOf(active)
    $: height = getHeights.get(active)?.()

    const getHeights = new Map<string, () => number>()
    setContext('height', (tab: string, getHeight: () => number) => getHeights.set(tab, getHeight))

    onMount(() => {
        height = getHeights.get(active)!()
    })
</script>

<TabBar {tabs} let:tab bind:active>
    <Tab {tab}>
        <Label>{tab}</Label>
    </Tab>
</TabBar>
<div class="carusal" style:transform="translateX(-{index * 100}%)" style:height={height ? `${height}px` : 'auto'}>
    <slot/>
</div>

<style>
    .carusal {
        display: grid;
        grid-auto-columns: 100%;
        transition: transform 300ms ease, height 300ms ease;
        align-items: flex-start;
    }
</style>