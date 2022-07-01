<script lang="ts">
    import OLLCube from '$lib/OLLCube.svelte'

    export let text: string
    export let href: string
</script>

<a class="cube" {href}>
    <div class="background">
        <slot><OLLCube/></slot>
    </div>
    <div class="text">
        {text}
    </div>
</a>

<style>
    a {
        appearance: none;
        text-decoration: none;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        border: none;
        box-shadow: .2rem .5rem .5rem hsl(0 0% 0% / .5);
        padding: 10%;
        background: hsl(var(--clr-gray-500));
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
        font-size: 2rem;
        color: hsl(var(--clr-gray-900));
    }
    a:active {
        filter: brightness(.8);
    }
</style>