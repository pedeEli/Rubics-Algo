<script lang="ts">
    import '../styles.css'

    let e: BeforeInstallPromptEvent
    let show = true
    const handler = (event: BeforeInstallPromptEvent) => {
        e = event
    }
    const install = () => {
        e.prompt()
        e.userChoice.then(() => show = false)
    }
</script>

<svelte:window on:beforeinstallprompt|preventDefault={handler} />
{#if show}
    <button on:click={install}>Test</button>
{/if}

<slot/>