<script lang="ts">
    import '../styles.css'

    let e: BeforeInstallPromptEvent | undefined
    let isInstalled = false
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
</script>

<svelte:window on:beforeinstallprompt|preventDefault={handler} on:appinstalled={appInstalled}/>
{#if !isInstalled && e !== undefined}
    <div class="dialog-wrapper">
        <div class="dialog">
            <div class="header">Als App Installieren</div>
            <button class="cancel" on:click={cancel}>Cancel</button>
            <button class="install" on:click={install}>Install</button>
        </div>
    </div>
{/if}

<slot/>

<style>
    .dialog-wrapper {
        position: fixed;
        inset: 0 0 0 0;
        display: grid;
        place-items: center;
        background-color: hsl(0 0% 0% / .5);
    }
    
    .dialog {
        background-color: hsl(var(--clr-gray-400));
        box-shadow: .2rem .5rem .5rem hsl(0 0% 0% / .5);
        display: grid;
        grid-template-areas:
            "header header"
            "cancel install";
        place-items: center;
        padding: 1rem;
        gap: 1rem;
        border-radius: 1rem;
    }
    .header {
        grid-area: header;
    }
    .cancel {
        grid-area: cancel;
    }
    .install {
        grid-area: install;
    }
    button {
        appearance: none;
        border: none;
        border-radius: .4em;
        font-size: 1rem;
        padding: .5em 1em;
        color: inherit;
        background-color: hsl(var(--clr-gray-500))
    }
    button:active {
        filter: brightness(.8);
    }
</style>