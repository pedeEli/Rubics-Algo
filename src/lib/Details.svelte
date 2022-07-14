<script lang="ts">
    import IconButton from '@smui/icon-button'

    import Dialog, {Title, Content, Actions} from '@smui/dialog'
    import TextField from '@smui/textfield'
    import Button from '@smui/button'
    import Ripple from '@smui/ripple'

    import {setDoc} from 'firebase/firestore'
    import Back from '$lib/Back.svelte'

    import {getContext, onDestroy} from 'svelte'

    export let back: '/oll' | '/pll'
    export let title: string
    export let defaultAlgos: string[]

    const userAlgos = getContext<AlgosContext>('algos')

    let algos: string[] = []
    const unsub = userAlgos.subscribe(async $userAlgos => {
        if (!$userAlgos) {
            algos = defaultAlgos
            return
        }
        const savedAlgos: string[] = $userAlgos.get(title) ?? []
        if (savedAlgos.length !== 0)
            return algos = savedAlgos
        
        await setDoc($userAlgos.ref, {[title]: [...defaultAlgos]}, {merge: true})
        algos = defaultAlgos
    })
    onDestroy(unsub)

    const add = async (algo: string) => {
        if (!$userAlgos)
            return
        try {
            await setDoc($userAlgos.ref, {
                [title]: [
                    ...algos,
                    algo
                ]
            }, {
                merge: true
            })
            algos = [...algos, algo]
        } catch (err) {
            console.log('no internet')
        }
    }

    const openAddDialog = () => {
        addDialog = true
        newAlgo = ''
    }

    const addNewAlgo = () => {
        if (!newAlgo)
            return
        addDialog = false
        add(newAlgo)
    }

    let newAlgo = ''
    let addDialog = false

    let infoDialog = false
    let infoDialogTitle = ''
    let infoDialogIndex = 0
    const openInfoDialog = (index: number) => () => {
        infoDialog = true
        infoDialogIndex = index
        infoDialogTitle = algos[index]
    }
    const deleteAlgo = async () => {
        if (!$userAlgos)
            return
        const newAlgos = [...algos.slice(0, infoDialogIndex), ...algos.slice(infoDialogIndex + 1)]
        await setDoc($userAlgos.ref, {[title]: newAlgos}, {merge: true})
        algos = newAlgos
        infoDialog = false
    }
</script>

<Back url={back}/>
<main>
    <h1>{title}</h1>
    <div class="cube">
        <slot/>
    </div>
    <div class="algos">
        {#each algos as algo, index}
            <button use:Ripple={{surface: true}} class="algo mdc-button mdc-button--raised" on:click={openInfoDialog(index)}>{algo}</button>
        {/each}
    </div>
    {#if $userAlgos}
    <IconButton class="material-icons" on:click={openAddDialog}>add</IconButton>
    {/if}
</main>

<Dialog bind:open={addDialog}>
    <Title>Add new algorithm</Title>
    <Content>
        <form on:submit|preventDefault={addNewAlgo}>
            <TextField label="Turns" bind:value={newAlgo}/>
        </form>
        <Actions>
            <Button on:click={addNewAlgo} disabled={!newAlgo}>Add</Button>
            <Button>Cancel</Button>
        </Actions>
    </Content>
</Dialog>

<Dialog bind:open={infoDialog}>
    <Title>{infoDialogTitle}</Title>
    <Content>
        <Actions>
            {#if algos.length > 1}
                <IconButton class="material-icons" on:click={deleteAlgo}>delete</IconButton>
            {/if}
        </Actions>
    </Content>
</Dialog>

<style>
    main {
        display: grid;
        grid-template-areas:
            "header header"
            "cube algos";
        justify-content: center;
        gap: 1rem;
        margin-inline: 1rem;
    }
    h1 {
        grid-area: header;
        text-align: center;
    }
    .cube {
        width: min(50vw, 10rem);
        height: min(50vw, 10rem);
        appearance: none;
        border-radius: 1rem;
        padding: min(5vw, 1rem);
        background: hsl(var(--clr-gray-500));
        grid-area: cube;
    }
    .algos {
        grid-area: algos;
        display: flex;
        flex-direction: column;
        gap: .4rem;
    }
    .algo {
        height: auto;
        padding-block: calc((36px - 0.875rem) / 2);
        font-size: 1.1rem;
    }
</style>