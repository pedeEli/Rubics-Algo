<script lang="ts">
    import {goto} from '$app/navigation'
    import {page} from '$app/stores'

    import Accordion, {Panel, Header, Content} from '@smui-extra/accordion'

    import Back from '$lib/Back.svelte'
    import CubeButton from '$lib/CubeButton.svelte'

    export let heading: 'oll' | 'pll'
    export let open: Set<string>
    export let cubes: Record<string, Record<string, object>>

    const titles = Object.keys(cubes)

    const openHandler = (title: string) => () => {
        open.add(title)
        updateQuery()
        goto(`?${$page.url.searchParams.toString()}`, {noscroll: true})
    }

    const closeHandler = (title: string) => () => {
        open.delete(title)
        updateQuery()
        goto(`?${$page.url.searchParams.toString()}`, {noscroll: true})
    }

    const updateQuery = () => {
        if (open.size === 0)
            return $page.url.searchParams.delete('open')
        $page.url.searchParams.set('open', [...open.values()].join(','))
    }
</script>

<Back url="/"/>
<main>
    <h1>{heading.toUpperCase()}</h1>
    <Accordion style="width: min(60rem, 90%);" multiple>
        {#each titles as title}
        {@const section = cubes[title]}
        <Panel
            open={open.has(title)}
            on:SMUIAccordionPanel:opened={openHandler(title)}
            on:SMUIAccordionPanel:closed={closeHandler(title)}
        >
            <Header>{title}</Header>
            <Content style="display: flex; justify-content: center;">
                <div class="cubes">
                    {#each Object.keys(section) as name}
                        {@const props = section[name]}
                        <CubeButton text={name} href="/{heading}/{title}/{name}">
                            <slot {props}/>
                        </CubeButton>
                    {/each}
                </div>
            </Content>
        </Panel>
        {/each}
    </Accordion>
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