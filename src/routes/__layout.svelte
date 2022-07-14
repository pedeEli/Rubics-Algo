<script lang="ts">
    import {setContext} from 'svelte'
    import {readable} from 'svelte/store'
    
    import {onAuthStateChanged} from 'firebase/auth'
    import {doc, getDoc} from 'firebase/firestore'
    import type {DocumentSnapshot, DocumentData} from 'firebase/firestore'

    import Snackbar, {Label, Actions} from '@smui/snackbar'
    import Button from '@smui/button'
    import IconButton from '@smui/icon-button'
    import type {SnackbarComponentDev} from '@smui/snackbar' 
    
    import {auth, db} from '$lib/firebase'
    import Login from '$lib/Login.svelte'

    let e: BeforeInstallPromptEvent | undefined
    let isInstalled = false
    let snackbar: SnackbarComponentDev

    $: if(!isInstalled && e !== undefined) {
        snackbar.open()
    }

    const handler = (event: BeforeInstallPromptEvent) => {
        e = event
    }
    const appInstalled = () => {
        isInstalled = true
    }
    const install = () => {
        if (!e)
            return
        e.prompt()
        e.userChoice.then(() => isInstalled = true)
    }
    const cancel = () => {
        e = undefined
    }

    const algos = readable<DocumentSnapshot<DocumentData> | undefined>(undefined, set => {
        return onAuthStateChanged(auth, async user => {
            if (!user)
                return set(undefined)
            const docRef = doc(db, `algos/${user.uid}`)
            set(await getDoc(docRef))
        })
    })
    setContext<AlgosContext>('algos', algos)
</script>

<svelte:window on:beforeinstallprompt|preventDefault={handler} on:appinstalled={appInstalled}/>
<Snackbar bind:this={snackbar}>
    <Label>Install app</Label>
    <Actions>
        <Button on:click={install}>Install</Button>
        <IconButton class="material-icons" title="Dismiss" on:click={cancel}>close</IconButton>
    </Actions>
</Snackbar>

<slot/>
<Login/>