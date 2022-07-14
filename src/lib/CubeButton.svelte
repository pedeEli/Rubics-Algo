<script lang="ts">
    import Button from '@smui/button'

    import OLLCube from '$lib/OLLCube.svelte'

    export let text: string
    export let href: string
</script>

<Button style="width: 100%; height: 100%; border-radius: 1rem; overflow: hidden;" {href} variant="raised" color="secondary">
    <div style="width: 100%; aspect-ratio: 1 / 1; display: grid;">
        <div class="background">
            <slot><OLLCube/></slot>
        </div>
        <div class="text">
            {text}
        </div>
    </div>
</Button>

<style>
    .background, .text {
        grid-column: 1;
        grid-row: 1;
        height: 100%;
        width: 100%;
    }
    .text {
        display: grid;
        place-items: center;
        text-shadow: .2rem .5rem .5rem hsl(0 0% 0% / .5);
        font-weight: bold;
        font-size: 2rem;
        color: hsl(var(--clr-gray-900));
    }
</style>