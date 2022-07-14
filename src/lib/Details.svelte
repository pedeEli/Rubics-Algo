<script lang="ts">
    import IconButton, {Icon} from '@smui/icon-button'
    import {Svg} from '@smui/common/elements'
    import {mdiPlus, mdiDelete} from '@mdi/js'

    import Dialog, {Title, Content, Actions} from '@smui/dialog'
    import Ripple from '@smui/ripple'

    import {setDoc} from 'firebase/firestore'
    import Back from '$lib/Back.svelte'
    import Algorithm from '$lib/Algorithm.svelte'
    import DetailedAlgorithm from '$lib/DetailedAlgorithm.svelte'
    import AlgorithmEditor from '$lib/AlgorithmEditor.svelte'

    import {getContext, onDestroy} from 'svelte'

    export let back: '/oll' | '/pll'
    export let title: string
    export let defaultAlgos: RubicsAlgorithm[]

    const userAlgos = getContext<AlgosContext>('algos')

    let algos: RubicsAlgorithm[] = []
    const unsub = userAlgos.subscribe(async $userAlgos => {
        if (!$userAlgos) {
            algos = defaultAlgos
            return
        }
        const savedAlgos: RubicsAlgorithm[] = $userAlgos.get(title) ?? []
        if (savedAlgos.length !== 0)
            return algos = savedAlgos
        
        await setDoc($userAlgos.ref, {[title]: [...defaultAlgos]}, {merge: true})
        algos = defaultAlgos
    })
    onDestroy(unsub)


    const handleSave = async ({detail}: CustomEvent<RubicsAlgorithm>) => {
        if (!$userAlgos)
            return
        try {
            algos = [...algos, detail]
            await setDoc($userAlgos.ref, { [title]: algos }, { merge: true })
        } catch (err) {
            console.error('no internet')
        }
    }

    const openAddDialog = () => {
        addDialog = !addDialog
        newAlgo = ''
    }

    let newAlgo = ''
    let addDialog = false

    let infoDialog = false
    let infoAlgo: RubicsAlgorithm = {turns: []}
    let infoDialogIndex = 0
    const openInfoDialog = (index: number) => () => {
        infoDialog = true
        edit = false
        infoDialogIndex = index
        infoAlgo = algos[index]
    }
    const deleteAlgo = async () => {
        if (!$userAlgos)
            return
        const newAlgos = [...algos.slice(0, infoDialogIndex), ...algos.slice(infoDialogIndex + 1)]
        algos = newAlgos
        infoDialog = false
        await setDoc($userAlgos.ref, {[title]: newAlgos}, {merge: true})
    }

    let edit = false
    let editAlgoValue: RubicsAlgorithm
    const editAlgo = () => {
        edit = true
        editAlgoValue = infoAlgo
    }
    const saveAlgo = async () => {
        if (!editAlgoValue || !$userAlgos)
            return
        infoAlgo = editAlgoValue
        algos[infoDialogIndex] = infoAlgo
        edit = false
        await setDoc($userAlgos.ref, {[title]: algos}, {merge: true})
    }
</script>

<Back url={back}/>
<main>
    <h1>
        <span class="title">
            {title}
        </span>
        {#if $userAlgos}
            <span class="add-button">
                <IconButton on:click={openAddDialog}>
                    <Icon component={Svg} viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiPlus}/>
                    </Icon>
                </IconButton>
            </span>
        {/if}
    </h1>

    <div class="editor">
        <AlgorithmEditor
            show={addDialog}
            algo={{turns: []}}
            selected={{type: 'new', index: -1}}
            on:save={handleSave}
        />
    </div>

    <div class="cube">
        <slot/>
    </div>
    <div class="algos">
        {#each algos as algo, index}
            <button use:Ripple={{surface: true}} class="algo mdc-button mdc-button--raised" on:click={openInfoDialog(index)}>
                <Algorithm {algo}/>
            </button>
        {/each}
    </div>
</main>

<Dialog bind:open={infoDialog}>
    <Title>Details</Title>
    <Content>
        <DetailedAlgorithm algo={infoAlgo}/>
        <Actions>
            <IconButton on:click={deleteAlgo}>
                <Icon component={Svg} viewBox="0 0 24 24">
                    <path fill="currentColor" d={mdiDelete}/>
                </Icon>
            </IconButton>
        </Actions>
    </Content>
</Dialog>

<!-- <Dialog bind:open={infoDialog}>
    <Title>Details</Title>
    <Content>
        {#if edit}
            <form on:submit|preventDefault={saveAlgo}>
                <TextField label="New Algorithm" bind:value={editAlgoValue}/>
            </form>
            <Actions>
                <Button on:click={saveAlgo} disabled={!editAlgoValue}>Save</Button>
                <Button on:click={() => edit = false}>Cancel</Button>
            </Actions>
        {:else}
            <div>{infoAlgo}</div>
            {#if $userAlgos}
                <Actions>
                    <IconButton class="material-icons" on:click={editAlgo}>edit</IconButton>
                    {#if algos.length > 1}
                        <IconButton class="material-icons" on:click={deleteAlgo}>delete</IconButton>
                    {/if}
                </Actions>
            {/if}
        {/if}
    </Content>
</Dialog> -->

<style>
    main {
        display: grid;
        grid-template-areas:
            "header header"
            "editor editor"
            "cube algos";
        justify-content: center;
        gap: 1rem;
        margin-inline: 1rem;
    }
    h1 {
        grid-area: header;
        margin: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
    }
    .title {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        text-align: center;
    }
    .add-button {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        justify-self: right;
    }
    .editor {
        grid-area: editor;
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