<script lang="ts">
    import {goto} from '$app/navigation'
    import {page} from '$app/stores'
    import {writable} from 'svelte/store'

    import Back from '$lib/Back.svelte'
    import Foldout from '$lib/Foldout.svelte'
    import CubeButton from '$lib/CubeButton.svelte'

    export let heading: 'oll' | 'pll'
    export let open: Set<string>
    export let cubes: Record<string, Record<string, object>>

    const titles = Object.keys(cubes)

    const openStore = writable(open)
    const toggle = (title: string) => () => {
        if ($openStore.has(title))
            $openStore.delete(title)
        else
            $openStore.add(title)
        
        if ($openStore.size === 0)
            $page.url.searchParams.delete('open')
        else
            $page.url.searchParams.set('open', [...$openStore.values()].join(','))
        
        goto(`?${$page.url.searchParams.toString()}`, {noscroll: true})
    }
</script>

<Back url="/"/>
<main>
    <h1>{heading.toUpperCase()}</h1>
    {#each titles as title}
        {@const section = cubes[title]}
        <Foldout {title} open={$openStore.has(title)} on:toggle={toggle(title)}>
            <div class="cubes">
                {#each Object.keys(section) as name}
                    {@const props = section[name]}
                    <CubeButton text={name} href="/{heading}/{title}/{name}">
                        <slot {props}/>
                    </CubeButton>
                {/each}
            </div>
        </Foldout>
    {/each}
</main>

<style>
    .cubes {
        display: grid;
        grid-template-columns: repeat(auto-fit, 10rem);
        grid-auto-rows: 10rem;
        gap: 1rem;
        font-size: .8rem;
        width: min(60rem, 90%);
        justify-content: center;
    }
</style>