<script lang="ts">
    import {auth, db} from '$lib/firebase'
    import {onDestroy} from 'svelte'
    import {signInWithEmailAndPassword, type AuthError, signOut} from 'firebase/auth'
    import {enableIndexedDbPersistence, type FirestoreError} from 'firebase/firestore'

    import Button from '@smui/button'
    import Textfield from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text'
    import Dialog, {Title, Content} from '@smui/dialog'
    import Snackbar, {Label, Actions} from '@smui/snackbar'
    import IconButton from '@smui/icon-button'
    
    import type {SnackbarComponentDev} from '@smui/snackbar' 

    let open = false

    let snackbar: SnackbarComponentDev

    let isLoggedIn = false
    const unsub = auth.onAuthStateChanged((user) => {
        isLoggedIn = user !== null
    })
    onDestroy(unsub)

    const handleClick = async () => {
        if (isLoggedIn)
            return await signOut(auth)
        open = true
        email = ''
        password = ''
        emailInvalid = false
        passwordInvalid = false

        if (persistenceEnabled)
            return
        await enablePersistence()
    }

    let email = ''
    let password = ''

    let emailInvalid = false
    let passwordInvalid = false

    let labelText = ''
    const snackbarMessages = {
        'auth/user-not-found': 'User not found',
        'auth/user-disabled': 'User is disabled',
        'auth/invalid-email': 'Email is not valid',
        'auth/wrong-password': 'Password is incorrect'
    }

    const persistenceErrors = {
        'unimplemented': 'Persistence of data when offline is not supported in this browser',
        'failed-precondition': 'Persistence of data when offline is not supported for multiple open tabs'
    }
    let persistenceEnabled = false
    let persistenceMessage = ''
    const enablePersistence = async () => {
        try {
            await enableIndexedDbPersistence(db)
            persistenceEnabled = true
        } catch (err) {
            const {code} = err as FirestoreError
            console.log(code)
            persistenceMessage = persistenceErrors[code as keyof typeof persistenceErrors]
        }
    }

    const login = async () => {
        if (emailInvalid || passwordInvalid)
            return

        try {
            await signInWithEmailAndPassword(auth, email, password)
            open = false
        } catch (err) {
            const {code} = err as AuthError
            console.log({code})
            labelText = snackbarMessages[code as keyof typeof snackbarMessages]
            snackbar.open()
        }
    }
</script>


<Button
    style="position: fixed; top: 1rem; right: 1rem; font-size: 2rem;"
    on:click={handleClick}
>
    {isLoggedIn ? 'Logout' : 'Login'}
</Button>
<Dialog bind:open>
    <Title>Login</Title>
    <Content>
        <form on:submit|preventDefault={login} novalidate>
            <Textfield
                type="email"
                label="Email"
                input$autocomplete="email"
                bind:invalid={emailInvalid}
                updateInvalid
                bind:value={email}
                required
            >
                <HelperText validationMsg slot="helper">
                    {#if email === ''}
                        Email is required
                    {:else}
                        Not a valid email
                    {/if}
                </HelperText>
            </Textfield>
            <Textfield
                type="password"
                label="Passwort"
                bind:invalid={passwordInvalid}
                updateInvalid
                bind:value={password}
                required
            >
                <HelperText validationMsg slot="helper">
                    Password is required
                </HelperText>
            </Textfield>
            <div class="persistence-error">{persistenceMessage}</div>
            <Button variant="raised" style="margin-top: .5rem;">
                Login
            </Button>
        </form>
    </Content>
</Dialog>

<Snackbar bind:this={snackbar} {labelText}>
    <Label/>
    <Actions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>

<style>
    .persistence-error {
        max-width: 40ch;
    }
</style>