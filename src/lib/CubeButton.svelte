<script context="module" lang="ts">
    import {browser} from '$app/env'
    const rem = browser && parseFloat(getComputedStyle(document.documentElement).fontSize)
    const canvas = browser && document.createElement('canvas')
    const ctx = canvas && canvas.getContext('2d')!
</script>

<script lang="ts">
    import {onMount} from 'svelte'
    import OLLCube from '$lib/OLLCube.svelte'

    export let text: string

    let fontSizeCh = 1
    let button: HTMLButtonElement
    onMount(() => {
        if (!ctx || !rem)
            return
        const parent = button.parentElement!

        const styles = getComputedStyle(parent)
        const {fontWeight, fontSize, fontFamily} = styles
        const font = `${fontWeight} ${fontSize} ${fontFamily}`
        ctx.font = font

        const textWidthPx = ctx.measureText(text).width
        const textWidthRem = textWidthPx / rem
        fontSizeCh = 10 / textWidthRem
    })
</script>

<button class="cube" bind:this={button} on:click>
    <div class="background">
        <slot><OLLCube/></slot>
    </div>
    <div class="text" style="font-size: {fontSizeCh}ch;">
        {text}
    </div>
</button>

<style>
    button {
        appearance: none;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        border: none;
        box-shadow: .2rem .5rem .5rem hsl(0 0% 0% / .5);
        padding: 10%;
        background: hsl(0, 0%, 33%);
        display: grid;
        transition: filter 100ms;
        font-size: inherit;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
    .background, .text {
        grid-column: 1;
        grid-row: 1;
        height: 100%;
    }
    .text {
        display: grid;
        place-items: center;
        text-shadow: .2rem .5rem .5rem hsl(0 0% 0% / .5);
        font-weight: bold;
        color: hsl(0 0% 95%);
    }
    button:active {
        filter: brightness(.8);
    }
</style>